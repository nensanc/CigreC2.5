# Generated by Django 3.1.7 on 2022-08-06 02:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_user_profile_photo_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_profile',
            name='slug',
        ),
    ]