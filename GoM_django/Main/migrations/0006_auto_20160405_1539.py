# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-04-05 15:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0005_admin_profile_coach_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_profile',
            name='about_me',
            field=models.TextField(default=b''),
        ),
        migrations.AddField(
            model_name='user_profile',
            name='occupation',
            field=models.CharField(blank=True, default=b'', max_length=200),
        ),
    ]