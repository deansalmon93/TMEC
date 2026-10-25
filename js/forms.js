// Tullymurry Equestrian Centre — website forms
// -----------------------------------------------------------------------------
// SETUP: once info@tullymurryequestrian.com is working, get a free access key
// at https://web3forms.com (enter that email address, the key is emailed to it)
// and paste it between the quotes below. Every form on the site will then
// deliver straight to that inbox.
//
// Until a key is added, the forms still work: submitting opens the visitor's
// own email app with the message filled in, addressed to the email below.
// -----------------------------------------------------------------------------
var TM_FORMS = {
  email: 'info@tullymurryequestrian.com',
  web3formsKey: ''
};

(function () {
  var LABELS = {
    name: 'Name', age: "Rider's age", riding_level: 'Riding level',
    preferred_days: 'Preferred day(s)', number_of_horses: 'Number of horses',
    livery_type: 'Type of livery', phone: 'Phone', email: 'Email',
    topic: 'Enquiry about', message: 'Message'
  };

  function collect(form) {
    var data = {};
    var order = [];
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (!el.name || el.name === 'botcheck') return;
      if (order.indexOf(el.name) === -1) order.push(el.name);
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (!el.checked) return;
        data[el.name] = data[el.name] ? data[el.name] + ', ' + el.value : el.value;
      } else if (el.value.trim()) {
        data[el.name] = el.value.trim();
      }
    });
    return { data: data, order: order };
  }

  function showError(form, msg) {
    var m = form.querySelector('.form-msg');
    m.textContent = msg;
    m.className = 'form-msg error';
  }

  function validate(form) {
    form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });
    var firstBad = null;
    // standard fields
    form.querySelectorAll('input[required]:not([type=radio]), select[required], textarea[required]').forEach(function (el) {
      if (!el.checkValidity()) { el.parentNode.classList.add('invalid'); firstBad = firstBad || el; }
    });
    // radio + checkbox groups (fieldsets with a required marker)
    form.querySelectorAll('fieldset').forEach(function (fs) {
      if (!fs.querySelector('legend span')) return; // not required
      if (!fs.querySelector('input:checked')) { fs.classList.add('invalid'); firstBad = firstBad || fs.querySelector('input'); }
    });
    if (firstBad) {
      showError(form, 'Please fill in the highlighted fields.');
      firstBad.focus();
      return false;
    }
    return true;
  }

  document.querySelectorAll('form.tm-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;

      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var btn = form.querySelector('button[type=submit]');
      var msg = form.querySelector('.form-msg');
      var c = collect(form);

      // Spam trap: bots fill hidden fields. Quietly "succeed".
      if (form.querySelector('.hp').checked) {
        msg.textContent = 'Thank you, your message has been sent.'; msg.className = 'form-msg ok'; form.reset(); return;
      }

      if (!TM_FORMS.web3formsKey) {
        var lines = c.order.filter(function (k) { return c.data[k]; }).map(function (k) {
          return (LABELS[k] || k) + ': ' + c.data[k];
        });
        window.location.href = 'mailto:' + TM_FORMS.email +
          '?subject=' + encodeURIComponent(subject + (c.data.name ? ' – ' + c.data.name : '')) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        msg.textContent = 'Your email app should open with your message ready to send. If it doesn’t, email us at ' + TM_FORMS.email + '.';
        msg.className = 'form-msg ok';
        return;
      }

      var payload = { access_key: TM_FORMS.web3formsKey, subject: subject + (c.data.name ? ' – ' + c.data.name : ''), from_name: 'Tullymurry website' };
      if (c.data.email) payload.replyto = c.data.email;
      c.order.forEach(function (k) { if (c.data[k]) payload[LABELS[k] || k] = c.data[k]; });

      btn.disabled = true;
      var label = btn.textContent;
      btn.textContent = 'Sending…';
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (!res.success) throw new Error(res.message || 'Failed');
        form.reset();
        msg.textContent = 'Thank you! Your message has been sent and we’ll be in touch soon.';
        msg.className = 'form-msg ok';
      }).catch(function () {
        showError(form, 'Sorry, something went wrong. Please call us on 028 4481 1880 or email ' + TM_FORMS.email + '.');
      }).then(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
    });

    // clear highlight as people fix fields
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.invalid');
      if (wrap) wrap.classList.remove('invalid');
    });
  });
})();
