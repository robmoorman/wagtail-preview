# Wagtail-preview

Alternative preview methods for Wagtail pages.

* JSON
* Window

## Status

* Proof of Concept
* Under development

## Installation

Install the package

```
pip install pip install git+https://github.com/moorinteractive/wagtail-preview.git
```

Add `wagtail-preview` to your `INSTALLED_APPS` settings and use the `PreviewMixin` mixin

```
# File settings.py

INSTALLED_APPS = [
    ...

    'wagtail-preview'
]

# File models.py

from wagtail.wagtailcore.models import Page
from wagtailpreview.views import PreviewMixin

class MyPage(PreviewMixin, Page)
    pass

```
