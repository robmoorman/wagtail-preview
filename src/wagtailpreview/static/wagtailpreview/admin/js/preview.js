$(function() {
  var $previewDropdown = $('.preview .dropdown-button');
  var $previewButtons = $('.preview .action-preview');
  var previewWindow = null;

  function getClickHandler(el) {
    return $._data(el[0], 'events').click[0].handler;
  }

  function submitPreview(enhanced) {
    var $el = $(this);
    var previewDoc = previewWindow.document;

    $.ajax({
      type: 'POST',
      url: $el.data('action'),
      data: $('#page-edit-form').serialize(),
      success: function(data, textStatus, request) {
        if (request.getResponseHeader('X-Wagtail-Preview') == 'ok') {
          if (enhanced) {
            var frame = previewDoc.getElementById('preview-frame');

            frame = frame.contentWindow || frame.contentDocument.document || frame.contentDocument;
            frame.document.open();
            frame.document.write(data);
            frame.document.close();

            var hideTimeout = setTimeout(function() {
              previewDoc.getElementById('loading-spinner-wrapper').className += ' remove';
              clearTimeout(hideTimeout);
            });
          } else {
            previewDoc.open();
            previewDoc.write(data);
            previewDoc.close();
          }
        } else {
          previewWindow.close();
          disableDirtyFormCheck();
          document.open();
          document.write(data);
          document.close();
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        previewDoc.open();
        previewDoc.write(xhr.responseText);
        previewDoc.close();
      }
    });
  }

  // Cache default page-editor.js click handler
  var defaultClickHandler = getClickHandler($previewButtons);

  // Unbind default page-editor.js behaviour
  $previewButtons.unbind('click');

  // Attach new click behaviour with custom live reload mechanisme
  $previewButtons.click(function(event) {
    var $el = $(this);
    var previewMode = $el.data('mode');

    if (previewMode === 'window') {
      event.preventDefault();

      previewWindow = window.open($el.data('placeholder'), $el.data('windowname'));

      if (previewWindow.addEventListener) {
        previewWindow.addEventListener('load', function() {
          submitPreview.call($el, true);
        }, false);
      } else if (previewWindow.attachEvent) {
        previewWindow.attachEvent('onload', function() {
          submitPreview.call($el, true);
        }, false);
      } else {
        submitPreview.call($el, false);
      }
    } else {
      // Call default page-editor.js behaviour
      defaultClickHandler.call(this, event);
    }

    // Always close the dropdown
    $previewDropdown.removeClass('open');
  });
});
