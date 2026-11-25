(function () {
  var forms = document.querySelectorAll('form.r3-form');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) { return; }
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      if (button) { button.disabled = true; button.textContent = 'Sending...'; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (!r.ok) { throw new Error('send failed'); }
        var box = document.createElement('div');
        box.className = 'r3-form';
        box.setAttribute('role', 'status');
        box.setAttribute('tabindex', '-1');
        var h = document.createElement('h2');
        h.textContent = 'Thank you!';
        var p = document.createElement('p');
        p.textContent = form.getAttribute('data-thanks') || 'We got your message and will get back to you soon.';
        box.appendChild(h);
        box.appendChild(p);
        form.parentNode.replaceChild(box, form);
        box.focus();
      }).catch(function () {
        form.submit();
      });
    });
  });
})();
