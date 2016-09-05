from django.core import serializers
from django.http import JsonResponse
from django.utils.translation import ugettext_lazy as _
from wagtail.wagtailcore.models import Page


class PreviewMixin(object):
    @property
    def preview_modes(self):
        return [
            ('', _('Default')),
            ('json', _('JSON')),
            ('window', _('Window')),
        ]

    def serve_preview(self, request, mode_name):
        if mode_name == 'json':
            data = serializers.serialize(
                'json', Page.objects.filter(pk=self.pk))
            return JsonResponse(data, safe=False)
        return super(PreviewMixin, self).serve_preview(request, mode_name)
