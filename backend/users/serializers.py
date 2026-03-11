from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ["first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        username = f"{first_name}_{last_name}".lower()
        password = validated_data['password']
        user = User.objects.create_user(
            username=username, 
            password=password, 
            first_name=first_name, 
            last_name=last_name
        )
        return user