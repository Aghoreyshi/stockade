from django.conf.urls import patterns, include, url
from vault.api import ProjectResource, SecretResource, UserResource, ProjectMemberResource
from tastypie.api import Api
from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(ProjectResource())
v1_api.register(SecretResource())
v1_api.register(UserResource())
v1_api.register(ProjectMemberResource())

urlpatterns = patterns(
    'vault.views',
    # Examples:
    # url(r'^$', 'stockade.views.home', name='home'),
    # url(r'^stockade/', include('stockade.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', 'login_view'),
    url(r'^logout/$', 'logout_view'),
    url(r'^$', 'base'),
    url(r'^api/', include(v1_api.urls)),
)
