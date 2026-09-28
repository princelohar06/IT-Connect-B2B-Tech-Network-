from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "full_name", "role", "is_active", "is_staff", "created_at")
    search_fields = ("email", "full_name", "phone")
    list_filter = ("role", "is_active", "is_staff")
    ordering = ("-created_at",)
