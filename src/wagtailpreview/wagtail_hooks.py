from django.conf import settings
from django.utils.html import format_html_join
from wagtail.wagtailcore import hooks


@hooks.register('insert_editor_js')
def preview_js():
    js_files = [
        'wagtailpreview/admin/js/preview.js',
    ]
    js_includes = format_html_join('\n', '<script src="{0}{1}"></script>',
        ((settings.STATIC_URL, filename) for filename in js_files)
    )
    return js_includes


@hooks.register('after_edit_page')
def notify_preview_window(request, page):
    pass
