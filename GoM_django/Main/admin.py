from django.contrib import admin
from Main.models import *

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'college', 'city', 'view_profile_url')
    search_fields = ['name']

    def view_profile_url(self, obj):
        return obj.view_profile_url()
    view_profile_url.allow_tags = True
    view_profile_url.short_description = 'View'

class CoachAdmin(admin.ModelAdmin):
    # list_display = ('name', 'gender','email_id')

    fieldsets = [(None, {'fields': ['name', 'gender','email_id', 'user', 'phone_one']}),]
    list_display = ('name', 'gender','email_id', 'number_of_students', 'view_profile_url', 'status')
    search_fields = ['name']
    # readonly_fields = ['address_2_html']

    def number_of_students(self, obj):
        return obj.number_of_students()

    def view_profile_url(self, obj):
        return obj.view_profile_url()
    view_profile_url.allow_tags = True
    number_of_students.short_description = 'Number of Students'
    view_profile_url.short_description = 'View'

class AdminAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'email_id')
    search_fields = ['name']    
admin.site.register(user_profile, ProfileAdmin)
admin.site.register(coach_profile, CoachAdmin)
admin.site.register(admin_profile, AdminAdmin)
# admin.site.register(survey_questions)