from setuptools import find_packages, setup


install_requires = [
    'django==1.10',
    'wagtail==1.6.2',
]

setup(
    name='wagtail-preview',
    version='0.1.0',
    description='Alternative preview methods for Wagtail pages.',
    author='Rob Moorman',
    author_email='rob@moori.nl',
    install_requires=install_requires,
    package_dir={'': 'src'},
    packages=find_packages('src'),
    include_package_data=True,
    classifier=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Operating System :: Unix',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
    ],
)
