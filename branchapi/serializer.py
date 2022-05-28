from dataclasses import field
import re
from django.db import models
from django.db.models import fields
from django.forms import model_to_dict
from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import get_user_model,authenticate
from officialapi .models import branch,technician,service_request,fitness,cycle,badminton,used_parts,brand,wheel_size,complaint,complaints_jobcard,accessories,accessories_jobcard,machine_type,model_no,model_name,logs
from django.db.models import Sum


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if user:
            if not user.is_superuser:
                attrs['user'] = user
                return attrs
            else:
                msg = ('Unable to authenticate with provided credentials')
                raise serializers.ValidationError(msg, code='authorization')  
        else:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')     
     
class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = branch
        fields = '__all__'
        
class TechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = technician
        fields = '__all__'
        read_only_fields = ('branch',)
            
class ServiceRequest(serializers.ModelSerializer):
    class Meta:
        model = service_request
        fields = '__all__'
        read_only_fields = ('status','date',)

class ServiceRequests(serializers.ModelSerializer):
    class Meta:
        model = service_request
        fields = '__all__'

class GetServiceRequestToDashboard(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = service_request
        fields = '__all__'

class GetServiceRequestToJobCard(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y")
    updated_date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = service_request
        fields = '__all__'

class GetServiceRequest(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    is_viewed = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = service_request
        fields = '__all__'

    def get_is_viewed(self,obj):
        if obj.category == 'fitness':
            if fitness.objects.filter(service_request = obj.id).exists():
                queryset =  fitness.objects.get(service_request = obj.id)
                return model_to_dict(queryset)
            else:
                return False
        if obj.category == 'cycle':
            if cycle.objects.filter(service_request = obj.id).exists():
                queryset = cycle.objects.get(service_request = obj.id)
                return model_to_dict(queryset)
            else:
                return False
        if obj.category == 'badminton':
            if badminton.objects.filter(service_request = obj.id).exists():
                queryset = badminton.objects.get(service_request = obj.id)
                return model_to_dict(queryset)
        else:
            return False
    def get_is_completed(self,obj):
        if obj.status == 'completed':
            if used_parts.objects.filter(service_request_id=obj.id).exists():
                queryset = used_parts.objects.filter(service_request_id = obj.id).aggregate(total_sum=Sum('amount'))
                return queryset
            else:
                return {'total_sum':0}
        else:
            return None

class MachineTypeSerailizer(serializers.ModelSerializer):
    class Meta:
        model = machine_type
        fields = '__all__'
        read_only_fields = ('branch',)


class ModelNoSerailizer(serializers.ModelSerializer):
    class Meta:
        model = model_no
        fields = '__all__'
        read_only_fields = ('branch',)

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = brand
        fields = '__all__'
        read_only_fields = ('branch',)


class ModelNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = model_name
        fields = '__all__'
        read_only_fields = ('branch',)

class WheelSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = wheel_size
        fields = '__all__'
        read_only_fields = ('branch',)

class ComplaintSerializer(serializers.ModelSerializer):
     class Meta:
        model = complaint
        fields = '__all__'
        read_only_fields = ('branch',)
    
class AccessoriesSerializer(serializers.ModelSerializer):
     class Meta:
        model = accessories
        fields = '__all__'
        read_only_fields = ('branch',)

class FitnessJobCard(serializers.ModelSerializer):
    class Meta:
        model = fitness
        fields = '__all__'
        read_only_fileds = ('attended_date',)

class CycleJobCard(serializers.ModelSerializer):
    service_requests = serializers.SerializerMethodField() 
    class Meta:
        model = cycle
        fields = '__all__'
        read_only_fileds = ('attended_date',)

    def get_service_requests(self,obj):
        queryset = service_request.objects.get(id=obj.service_request.id)
        return GetServiceRequestToJobCard(queryset).data

class PrintCycleJobCardSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    technician_name = TechnicianSerializer()
    size = WheelSizeSerializer()
    service_requests = serializers.SerializerMethodField() 
    customer_attended_technician = TechnicianSerializer()
    attended_date = serializers.DateField(format="%d-%m-%Y")
    date_of_purchase = serializers.DateField(format="%d-%m-%Y")
    service_attended_date = serializers.DateField(format="%d-%m-%Y")
    model_name = ModelNameSerializer()
    class Meta:
        model = cycle
        fields = '__all__'
        read_only_fileds = ('attended_date',)

    def get_service_requests(self,obj):
        queryset = service_request.objects.get(id=obj.service_request.id)
        return GetServiceRequestToJobCard(queryset).data
    

class PrintFitnessJobCard(serializers.ModelSerializer):
    service_requests = serializers.SerializerMethodField() 
    machine_type = MachineTypeSerailizer()
    model_no = ModelNoSerailizer()
    technician_name = TechnicianSerializer()
    customer_attended_technician = TechnicianSerializer()
    attended_date = serializers.DateField(format="%d-%m-%Y")
    date_of_purchase = serializers.DateField(format="%d-%m-%Y")
    class Meta:
        model = fitness
        fields = '__all__'
        read_only_fileds = ('attended_date',)
        
    def get_service_requests(self,obj):
        queryset = service_request.objects.get(id=obj.service_request.id)
        return GetServiceRequestToJobCard(queryset).data
    
class PrintBadmintonJobCard(serializers.ModelSerializer):
    nearest_branch = BranchSerializer()
    brand = BrandSerializer()
    model = ModelNoSerailizer()
    technician = TechnicianSerializer()
    attended_date = serializers.DateField(format="%d-%m-%Y")
    service_requests = serializers.SerializerMethodField() 
    class Meta:
        model = badminton
        fields = '__all__'
    def get_service_requests(self,obj):
        queryset = service_request.objects.get(id=obj.service_request.id)
        return GetServiceRequestToJobCard(queryset).data
    

class BadmintonJobCard(serializers.ModelSerializer):
    class Meta:
        model = badminton
        fields = '__all__'

# class GetBadmintonJobCard(serializers.ModelSerializer):
#     attended_date = serializers.DateTimeField(format="%d-%m-%Y")
#     class Meta:
#         model = badminton
#         fields = '__all__'

class UsedParts(serializers.ModelSerializer):
    class Meta:
        model = used_parts
        fields = '__all__'
            
class ComplaintsJobCards(serializers.ModelSerializer):
    class Meta:
        model = complaints_jobcard
        fields = '__all__'

            
class ViewComplaintsJobCard(serializers.ModelSerializer):
    complaint = ComplaintSerializer(read_only=True)
    class Meta:
        model = complaints_jobcard
        fields = '__all__'

class CreateAccessoriesJobCard(serializers.ModelSerializer):
    class Meta:
        model = accessories_jobcard
        fields = '__all__'

class ViewAccessoriesJobCard(serializers.ModelSerializer):
    accessories = AccessoriesSerializer(read_only=True)
    class Meta:
        model = accessories_jobcard
        fields = '__all__'

class CreateServiceRequest(serializers.ModelSerializer):
    class Meta:
        model = service_request
        fields = '__all__'
        read_only_fields = ('date','status','branch',)

class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = logs
        fields = '__all__'
        read_only_fields = ('user',)
