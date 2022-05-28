from django.db.models import fields
from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import get_user_model,authenticate

from web.models import AboutBranch
from .models import badminton, branch, cycle, fitness, service_request,products,slider,blog,banner,used_parts,brands,ads,brand,wheel_size,logs
from django.db.models.aggregates import Count
from django.forms.models import model_to_dict
from versatileimagefield.serializers import VersatileImageFieldSerializer
from rest_framework import pagination
from rest_framework.pagination import PageNumberPagination
from branchapi . serializer import TechnicianSerializer,MachineTypeSerailizer,ModelNameSerializer,ModelNoSerailizer,GetServiceRequestToJobCard

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
                if user.is_superuser:
                    attrs['user'] = user
                    return attrs
                else:
                    msg = ('Unable to authenticate with provided credentials')
                    raise serializers.ValidationError(msg, code='authorization')     
        else:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = ('id','email', 'password','branch','designation','phone')
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ('id',)

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data,)
        
    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AdminUser(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','email', 'password','designation','phone')
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ('id',)

    def create(self, validated_data):
         return get_user_model().objects.create_superuser(**validated_data)

class BranchSerializer(serializers.ModelSerializer):
    has_requests = serializers.SerializerMethodField()
    class Meta:
        model = branch
        fields = '__all__'
        
    def get_has_requests(self,obj):
        if service_request.objects.filter(branch=obj).exists():
            return True
        else:
            return False
        
class GetBranchDetails(serializers.ModelSerializer):
    open = serializers.SerializerMethodField()
    attended = serializers.SerializerMethodField()
    pending = serializers.SerializerMethodField()
    completed = serializers.SerializerMethodField()
    class Meta:
        model = branch
        fields = '__all__'
        
    def get_open(self,obj):
        openCount = service_request.objects.filter(branch_id=obj.id,status='open').count()
        return openCount
    def get_attended(self,obj):
        attendCount = service_request.objects.filter(branch_id=obj.id,status='attended').count()
        return attendCount
    def get_pending(self,obj):
        pendingCount = service_request.objects.filter(branch_id=obj.id,status='pending').count()
        return pendingCount
    def get_completed(self,obj):
            completedCount = service_request.objects.filter(branch_id=obj.id,status='completed').count()
            return completedCount
        

class GetBranchBasedRequests(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    job_card = serializers.SerializerMethodField()
 
    class Meta:
        model = service_request
        fields = '__all__'

    def get_job_card(self,obj):
        if obj.category == 'fitness':
            if fitness.objects.filter(service_request = obj.id).exists():
                queryset = fitness.objects.get(service_request = obj.id)
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

class GetReportsSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    job_card = serializers.SerializerMethodField()
    branch = BranchSerializer()
 
    class Meta:
        model = service_request
        fields = '__all__'

    def get_job_card(self,obj):
        if obj.category == 'fitness':
            if fitness.objects.filter(service_request = obj.id).exists():
                queryset = fitness.objects.get(service_request = obj.id)
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


class ProductSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    class Meta:
        model = products
        fields = '__all__'

class EditProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = products
        fields = '__all__'


class SliderSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    class Meta:
        model = slider
        fields = '__all__'

class EditSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = slider
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    image_one = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    image_two = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    class Meta:
        model = blog
        fields = '__all__'


class EditBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = blog
        fields = '__all__'

class BannerSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
   
    class Meta:
        model = banner
        fields = '__all__'


class EditBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = banner
        fields = '__all__'

class GetCycleJobCard(serializers.ModelSerializer):
    attended_date = serializers.DateField(format="%d-%m-%Y")
    service_attended_date = serializers.DateField(format="%d-%m-%Y")
    completed_date = serializers.DateField(format="%d-%m-%Y")
    class Meta:
        model = cycle
        fields = '__all__'

class GetFitnessJobCard(serializers.ModelSerializer):
    attended_date = serializers.DateField(format="%d-%m-%Y")
    date_of_purchase = serializers.DateField(format="%d-%m-%Y")
    completed_date = serializers.DateField(format="%d-%m-%Y")
    class Meta:
        model = fitness
        fields = '__all__'

class GetBadmintonJobCard(serializers.ModelSerializer):
    completed_date = serializers.DateField(format="%d-%m-%Y")
    class Meta:
        model = badminton
        fields = '__all__'


class BrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = brand
        fields = '__all__'

class WheelSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = wheel_size
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    class Meta:
        model = brands
        fields = '__all__'


class EditBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = brands
        fields = '__all__'


class AdsSerializer(serializers.ModelSerializer):
    image_one = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    image_two = VersatileImageFieldSerializer(
        sizes=[
            ('small_square_crop', 'crop__50x50')
        ]
    )
    class Meta:
        model = ads
        fields = '__all__'
class BrandSerializers(serializers.ModelSerializer):
    class Meta:
        model = brand
        fields = '__all__'
        read_only_fields = ('branch',)
        
class EditAdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ads
        fields = '__all__'

class LogsSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = logs 
        fields = '__all__'
class PrintCycleJobCardSerializer(serializers.ModelSerializer):
    brand = BrandsSerializer()
    technician_name = TechnicianSerializer()
    size = WheelSizeSerializer()
    service_requests = serializers.SerializerMethodField() 
    customer_attended_technician = TechnicianSerializer()
    attended_date = serializers.DateField(format="%d-%m-%Y")
    date_of_purchase = serializers.DateField(format="%d-%m-%Y")
    service_attended_date = serializers.DateField(format="%d-%m-%Y")
    completed_date = serializers.DateField(format="%d-%m-%Y")
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
    completed_date = serializers.DateField(format="%d-%m-%Y")
    class Meta:
        model = fitness
        fields = '__all__'
        read_only_fileds = ('attended_date',)
        
    def get_service_requests(self,obj):
        queryset = service_request.objects.get(id=obj.service_request.id)
        return GetServiceRequestToJobCard(queryset).data
    
class PrintBadmintonJobCard(serializers.ModelSerializer):
    nearest_branch = BranchSerializer()
    brand = BrandsSerializer()
    model = ModelNoSerailizer()
    technician = TechnicianSerializer()
    attended_date = serializers.DateField(format="%d-%m-%Y")
    completed_date = serializers.DateField(format="%d-%m-%Y")
    service_requests = serializers.SerializerMethodField() 
    class Meta:
        model = badminton
        fields = '__all__'
        read_only_fields = ('attended_date',)
    def get_service_requests(self,obj):
        queryset = service_request.objects.get(id=obj.service_request.id)
        return GetServiceRequestToJobCard(queryset).data
    
# class FilterDataPagination(PageNumberPagination):
#     page_size = 2
#     page_size_query_param = 'page_size'
#     max_page_size = 1000


class AboutbranchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AboutBranch
        fields = '__all__'
