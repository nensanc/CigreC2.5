# Generated by Django 3.1.7 on 2022-08-06 02:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_projects_photo_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projects',
            name='slug',
        ),
    ]
