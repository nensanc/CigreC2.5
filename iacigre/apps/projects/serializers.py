from rest_framework import serializers
from .models import Projects

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = [
            'id',
            'title',
            'desc',
            'photo',
            'category',
            'github',
            'author',
            'status',
            'created_at',
            'updated_at',
        ]