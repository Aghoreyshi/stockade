from tastypie import fields
from tastypie.resources import ModelResource
from models import Project, Secret, ProjectMember
from django.contrib.auth.models import User
from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication, MultiAuthentication, Authentication
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import DjangoAuthorization, Authorization


class ProjectMemberResource(ModelResource):
    class Meta:
        queryset = ProjectMember.objects.all()
        resource_name = 'members'
        #authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        #authorization = DjangoAuthorization()


class ProjectResource(ModelResource):
    class Meta:
        queryset = Project.objects.all()
        resource_name = 'projects'
        members = fields.ToManyField(ProjectMemberResource, 'members')
        filtering = {
            'id': ALL,
            'name': ALL,
            'create_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'modified_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }
        authentication = Authentication()
        authorization = Authorization()
        #authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        #authorization = DjangoAuthorization()


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'users'
        filtering = {
            'username': ALL,
        }
        #authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        #authorization = DjangoAuthorization()
        #excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']


class SecretResource(ModelResource):
    project = fields.ForeignKey(ProjectResource, 'project')
    last_user = fields.ForeignKey(UserResource, 'last_user', full=True)
    class Meta:
        queryset = Secret.objects.all()
        resource_name = 'secrets'
        filtering = {
            'user': ALL_WITH_RELATIONS,
            'project': ALL_WITH_RELATIONS,
            'create_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'modified_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }
        #authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        #authorization = DjangoAuthorization()
