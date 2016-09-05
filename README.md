# Wagtail-preview

Alternative preview modes for Wagtail pages (for opinionated common usage).

* JSON
* Window

Goal is to provide a preview window which reloads on new drafts, kinda how `live reload` works (except than for content editors).

![Preview modes](docs/screenshot.png)

## Status

* Proof of Concept
* Under development

## Installation

Install the package

```
pip install pip install git+https://github.com/moorinteractive/wagtail-preview.git
```

Add `wagtail-preview` to your `INSTALLED_APPS` settings and use the `PreviewMixin` mixin

```python
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
