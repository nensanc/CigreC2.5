# Generated by Django 3.1.7 on 2022-08-01 03:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
        ('section', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Projects',
            new_name='Section',
        ),
    ]
