from errno import EALREADY
import re
from django.db.models.aggregates import Count
from django.shortcuts import render
from . serializer import AboutbranchSerializer, AuthTokenSerializer, BannerSerializer, BlogSerializer, EditBannerSerializer, EditBlogSerializer
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import generics
from rest_framework.settings import api_settings
from rest_framework import status, viewsets
from .serializer import BranchSerializer,UserSerializer,GetBranchDetails,GetBranchBasedRequests,AdminUser,ProductSerializer,EditProductSerializer,SliderSerializer,EditSliderSerializer,GetBadmintonJobCard,GetCycleJobCard,GetFitnessJobCard,BrandSerializer,EditBrandSerializer,AdsSerializer,EditAdsSerializer,BrandsSerializer,WheelSizeSerializer,GetReportsSerializer,LogsSerializer,PrintBadmintonJobCard,PrintCycleJobCardSerializer,PrintFitnessJobCard
from .models import badminton, banner, blog, branch, cycle, fitness, products, service_request, slider,used_parts,brands,ads,brand,technician,wheel_size,complaints_jobcard,accessories_jobcard,machine_type,model_no,model_name,logs
from rest_framework.views import APIView
from django.contrib.auth import get_user_model,authenticate
from rest_framework.response import Response
from branchapi . serializer import UsedParts,TechnicianSerializer,ViewComplaintsJobCard,ComplaintsJobCards,CreateAccessoriesJobCard,ViewAccessoriesJobCard,MachineTypeSerailizer,ModelNoSerailizer,ModelNameSerializer
import json
import requests
from web.models import AboutBranch

# Create your views here.
class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class CreateUserView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateAdminUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    serializer_class = AdminUser

class Branch(viewsets.ModelViewSet):
    serilizer_class = BranchSerializer
    queryset = branch.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        if service_request.objects.filter(branch=self.kwargs['pk']).exists():
            return Response({},status.HTTP_400_BAD_REQUEST) 
        else: 
            return super().perform_destroy(instance)

    def get_serializer_class(self):
        if self.action == 'POST':
            return BranchSerializer
        return BranchSerializer

class BranchRequests(viewsets.ModelViewSet):
    serilizer_class = GetBranchDetails
    queryset = branch.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'GET':
            return GetBranchDetails
        else:
            return GetBranchDetails
    http_method_names = ['get','list','retrieve']
    
class GetBranchServiceRequests(viewsets.ModelViewSet):
    serilizer_class = GetBranchBasedRequests
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        branch = self.request.query_params.get('branch_id')
        if branch != None:
            return self.queryset.filter(branch_id = branch)
        else:
            return self.queryset.all()
    def get_serializer_class(self):
        if self.action == 'list':
            return GetBranchBasedRequests
        return GetBranchBasedRequests

class GetBranchServiceRequestsBasedStatus(viewsets.ModelViewSet):
    serilizer_class = GetBranchBasedRequests
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        branch = self.request.query_params.get('branch_id')
        status = self.request.query_params.get('status')
        return self.queryset.filter(branch_id = branch,status=status)
        
    def get_serializer_class(self):
        if self.action == 'list':
            return GetBranchBasedRequests
        return GetBranchBasedRequests

class GetReports(viewsets.ModelViewSet):
    serilizer_class = GetReportsSerializer
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        category = self.request.query_params.get('category')
        status = self.request.query_params.get('status')
        branch = self.request.query_params.get('branch')
        startdate = self.request.query_params.get('startdate')
        enddate = self.request.query_params.get('enddate')
        statusList = json.loads(status)
        categoryList = json.loads(category)
        branchList = json.loads(branch)
        return self.queryset.filter(date__date__gte = startdate,date__date__lte = enddate, status__in=statusList,category__in=categoryList,branch__in = branchList)
        
    def get_serializer_class(self):
        if self.action == 'list':
            return GetReportsSerializer
        return GetReportsSerializer

class GetLogs(viewsets.ModelViewSet):
    serilizer_class = LogsSerializer
    queryset = logs.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        serviceRequest = self.request.query_params.get('service_request')
        return self.queryset.filter(service_request=serviceRequest)

    def get_serializer_class(self):
        return LogsSerializer
    http_method_names = ['get']

class GetBrands(viewsets.ModelViewSet):
    serilizer_class = BrandsSerializer
    queryset = brand.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_serializer_class(self):
        if self.action=='GET':
            return BrandsSerializer
        return BrandsSerializer


class GetWheelSizes(viewsets.ModelViewSet):
    serilizer_class = WheelSizeSerializer
    queryset = wheel_size.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_serializer_class(self):
        if self.action=='GET':
            return WheelSizeSerializer
        return WheelSizeSerializer
    

class GetModelName(viewsets.ModelViewSet):
    serilizer_class = ModelNameSerializer
    queryset = model_name.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_serializer_class(self):
        if self.action=='GET':
            return ModelNameSerializer
        return ModelNameSerializer
    http_method_names = ['get', 'list',]


class GetTechnicians(viewsets.ModelViewSet):
    serilizer_class = TechnicianSerializer
    queryset = technician.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_serializer_class(self):
        if self.action=='GET':
            return TechnicianSerializer
        return TechnicianSerializer
        
class GetCycleJobCards(viewsets.ModelViewSet):
    serilizer_class = GetCycleJobCard
    queryset = cycle.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    
    def get_queryset(self):
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'GET':
            return GetCycleJobCard
        return GetCycleJobCard


class GetFitnessJobCards(viewsets.ModelViewSet):
    serilizer_class = GetFitnessJobCard
    queryset = fitness.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        return super().get_queryset()
    
    def get_serializer_class(self):
        if self.action == 'GET':
            return GetFitnessJobCard
        return GetFitnessJobCard

class GetBadmintonJobCards(viewsets.ModelViewSet):
    serilizer_class = GetBadmintonJobCard
    queryset = badminton.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'GET':
            return GetBadmintonJobCard
        return GetBadmintonJobCard

class ComplaintsJobCardView(viewsets.ModelViewSet):
    serializer_class = ComplaintsJobCards
    queryset = complaints_jobcard.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        serviseRequest = self.request.query_params.get('service_request')
        if serviseRequest != None:
            return self.queryset.filter(service_request=serviseRequest)
        else:
            return self.queryset.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ViewComplaintsJobCard
        return ComplaintsJobCards

    http_method_names = ['get', 'list',]

class PrintCycleJobCard(viewsets.ModelViewSet):
    serializer_class = PrintCycleJobCardSerializer
    queryset = cycle.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get',]

class PrintFitnessJobCard(viewsets.ModelViewSet):
    serializer_class = PrintFitnessJobCard
    queryset = fitness.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get',]
    
class PrintBadmintonJobCard(viewsets.ModelViewSet):
    serializer_class = PrintBadmintonJobCard
    queryset = badminton.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get',]
    


class AccessoriesJobCards(viewsets.ModelViewSet):
    serializer_class = CreateAccessoriesJobCard
    queryset = accessories_jobcard.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        serviseRequest = self.request.query_params.get('service_request')
        if serviseRequest != None:
            return self.queryset.filter(service_request=serviseRequest)
        else:
            return self.queryset.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ViewAccessoriesJobCard
        return CreateAccessoriesJobCard
    http_method_names = ['get', 'list']


class MachineType(viewsets.ModelViewSet):
    serializer_class = MachineTypeSerailizer
    queryset = machine_type.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.all()

    http_method_names = ['get', 'list']
  

class ModelNo(viewsets.ModelViewSet):
    serializer_class = ModelNoSerailizer
    queryset = model_no.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.all()

    http_method_names = ['get', 'list']

class UsedParts(viewsets.ModelViewSet):
    serializer_class = UsedParts
    queryset = used_parts.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        serviseRequest = self.request.query_params.get('service_request')
        if serviseRequest != None:
            return self.queryset.filter(service_request=serviseRequest)
        else:
            return self.queryset.all()

    def perform_create(self, serializer):
        return super().perform_create(serializer)
        
class GetCount(APIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get(self,request,format=None):
        completed = service_request.objects.filter(status = 'completed').count()
        open = service_request.objects.filter(status = 'open').count()
        attended = service_request.objects.filter(status = 'attended').count()
        pending = service_request.objects.filter(status = 'pending').count()

        data = {
            'completed':completed,
            'open':open,
            'attended':attended,
            'pending':pending
        }
        return Response(data)


class Products(viewsets.ModelViewSet):
    serilizer_class = ProductSerializer
    queryset = products.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def get_serializer_class(self):
        if self.action == 'GET':
            return ProductSerializer
        if self.action == 'update':
            return EditProductSerializer
        return ProductSerializer

class Slider(viewsets.ModelViewSet):
    serilizer_class = SliderSerializer
    queryset = slider.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def get_serializer_class(self):
        if self.action == 'GET':
            return SliderSerializer
        if self.action == 'update':
            return EditSliderSerializer
        return SliderSerializer

class Blog(viewsets.ModelViewSet):
    serilizer_class = BlogSerializer
    queryset = blog.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def get_serializer_class(self):
        if self.action == 'GET':
            return BlogSerializer
        if self.action == 'update':
            return EditBlogSerializer
        return BlogSerializer

class Banner(viewsets.ModelViewSet):
    serilizer_class = BlogSerializer
    queryset = banner.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def get_serializer_class(self):
        if self.action == 'GET':
            return BannerSerializer
        if self.action == 'update':
            return EditBannerSerializer
        return BannerSerializer


class Ads(viewsets.ModelViewSet):
    serilizer_class = AdsSerializer
    queryset = ads.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def get_serializer_class(self):
        if self.action == 'GET':
            return AdsSerializer
        if self.action == 'update':
            return EditAdsSerializer
        return AdsSerializer
        
class Brands(viewsets.ModelViewSet):
    serializer_class = BrandSerializer
    queryset = brands.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)


class MtalkzSmsBalance(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    def get(self,request):
        response = requests.get("https://msg.mtalkz.com/V2/http-balance-api.php?apikey=WXMW9R3sqJgBOJRd&format=json")
        return Response({'response':response})
        

class DeleteUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    def get(self,request,format=None):
        user = request.user.email
        userSplit = user.split('@')
        data = userSplit[0]
        return Response({'user':data,'email':user})

    def delete(self,request,format=None):
        userId = request.POST['id']
        if len(get_user_model().objects.filter(is_superuser = True)) > 1:
            get_user_model().objects.get(id=userId).delete()
            return Response({'msg':True})
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    def get(self, request, format=None):
        self,request.user.auth_token.delete()
        return Response({'true':'msg'})


class Aboutbranch_view(viewsets.ModelViewSet):
    serializer_class = AboutbranchSerializer
    queryset = AboutBranch.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)