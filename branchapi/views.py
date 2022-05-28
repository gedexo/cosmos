from traceback import print_tb
from django.db.models.query import QuerySet
from django.http import request
from django.shortcuts import render
from rest_framework import views
from officialapi.models import branch, service_request,fitness,cycle,badminton,used_parts,brand,wheel_size,complaint,complaints_jobcard,accessories,accessories_jobcard,machine_type,model_no,model_name,logs
from . serializer import AuthTokenSerializer,TechnicianSerializer,ServiceRequest,GetServiceRequest,FitnessJobCard,CycleJobCard,BadmintonJobCard,GetServiceRequestToDashboard,ServiceRequests,UsedParts,BrandSerializer,WheelSizeSerializer,ComplaintSerializer,ComplaintsJobCards,ViewComplaintsJobCard,CreateAccessoriesJobCard,ViewAccessoriesJobCard,AccessoriesSerializer,MachineTypeSerailizer,ModelNoSerailizer,PrintCycleJobCardSerializer,PrintFitnessJobCard,PrintBadmintonJobCard,ModelNameSerializer,CreateServiceRequest,LogsSerializer
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import generics
from rest_framework.settings import api_settings
from rest_framework import status, viewsets
from rest_framework.views import APIView
from django.contrib.auth import get_user_model,authenticate
from rest_framework.response import Response
from officialapi. models import technician
from datetime import date, datetime
from django.utils import timezone
import datetime
from . sendmessage import sendsms

# Create your views here.

class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class Technician(viewsets.ModelViewSet):
    serializer_class = TechnicianSerializer
    queryset = technician.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category != None:
            return self.queryset.filter(branch = self.request.user.branch,category=category)
        else:
            return self.queryset.filter(branch = self.request.user.branch)
            

    def perform_create(self, serializer):
        serializer.save(branch=self.request.user.branch)

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)
        

class ServiceRequest(viewsets.ModelViewSet):
    serializer_class = ServiceRequest
    queryset = service_request.objects.all()

    def perform_create(self, serializer):
        serializer.save(status='open',date= datetime.datetime.now(tz=timezone.utc))


class CreateServiceRequestsBranch(viewsets.ModelViewSet):
    serializer_class = CreateServiceRequest
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def perform_create(self, serializer):
        serializer.save(status='open',date= datetime.datetime.now(tz=timezone.utc),branch=self.request.user.branch)
        
class GetServiceRequests(viewsets.ModelViewSet):
    serializer_class = GetServiceRequest
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        status = self.request.query_params.get('status')
        openObj = ['completed','pending','attended']
        completedObj = ['open','pending','attended']
        attendedObj = ['open','completed']
        if status == 'open':
            return self.queryset.filter(branch = self.request.user.branch).exclude(status__in=openObj).order_by('-date')
        elif status == 'attended':
            return self.queryset.filter(branch = self.request.user.branch).exclude(status__in = attendedObj).order_by('-date')
        else:
            return self.queryset.filter(branch = self.request.user.branch).exclude(status__in = completedObj).order_by('-date')

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class DelServiceRequest(viewsets.ModelViewSet):
    serializer_class = ServiceRequests
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return super().get_queryset()
    def perform_destroy(self, instance):
        return super().perform_destroy(instance)



class GertServiceRequestToDashboard(viewsets.ModelViewSet):
    serializer_class = GetServiceRequestToDashboard
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category != None:
            return self.queryset.filter(branch = self.request.user.branch.id,category=category).exclude(status='completed')
        else:
            return self.queryset.all()


# new changes

class Brands(viewsets.ModelViewSet):
    serializer_class = BrandSerializer
    queryset = brand.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category != None:
            return self.queryset.filter(branch=self.request.user.branch,category=category)
        else:
            return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)

class WheelSize(viewsets.ModelViewSet):
    serializer_class = WheelSizeSerializer
    queryset = wheel_size.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)


class MachineType(viewsets.ModelViewSet):
    serializer_class = MachineTypeSerailizer
    queryset = machine_type.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)

class ModelNo(viewsets.ModelViewSet):
    serializer_class = ModelNoSerailizer
    queryset = model_no.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)

class Complaints(viewsets.ModelViewSet):
    serializer_class = ComplaintSerializer
    queryset = complaint.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
   
    def get_queryset(self): 
        category = self.request.query_params.get('category')
        if category != None:
            return self.queryset.filter(branch=self.request.user.branch,category=category)
        else:
            return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)

class Accessories(viewsets.ModelViewSet):
    serializer_class = AccessoriesSerializer
    queryset = accessories.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)


class ModelName(viewsets.ModelViewSet):
    serializer_class = ModelNameSerializer
    queryset = model_name.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.branch)

    def perform_create(self, serializer):
        serializer.save(branch = self.request.user.branch)

################################################################ end 

class FitnessJobCard(viewsets.ModelViewSet):
    serializer_class = FitnessJobCard
    queryset = fitness.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def perform_create(self, serializer):
        updateStaus = service_request.objects.get(id= self.request.POST['service_request'])
        updateStaus.status = self.request.POST['status']
        updateStaus.save()
        attendedDate = date.today()
        branchNumber = updateStaus.branch.phone
        branchName = updateStaus.branch.name
        serviceRequestId = self.request.POST['service_request']
        phone = updateStaus.phone
        if serializer.is_valid():
            sendsms(branchNumber,branchName,serviceRequestId,phone)
        serializer.save(attended_date = attendedDate)

    def perform_update(self, serializer):
        updateStaus = service_request.objects.get(id= self.request.POST['service_request'])
        updateStaus.status = self.request.POST['status']
        updateStaus.save()
        return super().perform_update(serializer)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

class CycleJobCard(viewsets.ModelViewSet):
    serializer_class = CycleJobCard
    queryset = cycle.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        return super().get_queryset()

    def perform_create(self, serializer):
        updateStaus = service_request.objects.get(id= self.request.POST['service_request'])
        updateStaus.status = self.request.POST['status']
        updateStaus.save()
        attendedDate = date.today()
        branchNumber = updateStaus.branch.phone
        branchName = updateStaus.branch.name
        serviceRequestId = self.request.POST['service_request']
        phone = updateStaus.phone
        if serializer.is_valid():
            sendsms(branchNumber,branchName,serviceRequestId,phone)
        serializer.save(attended_date = attendedDate)


    def perform_update(self, serializer):
        updateStaus = service_request.objects.get(id= self.request.POST['service_request'])
        updateStaus.status = self.request.POST['status']
        updateStaus.save()
        return super().perform_update(serializer)

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
    
class BadmintonJobCard(viewsets.ModelViewSet):
    serializer_class = BadmintonJobCard
    queryset = badminton.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        return super().get_queryset()

    def perform_create(self, serializer):
        updateStaus = service_request.objects.get(id= self.request.POST['service_request'])
        updateStaus.status = self.request.POST['status']
        updateStaus.save()
        branch = updateStaus.branch.id
        branchNumber = updateStaus.branch.phone
        branchName = updateStaus.branch.name
        serviceRequestId = self.request.POST['service_request']
        phone = updateStaus.phone
        print('*'*10,self.request.POST['attended_date'])
        if serializer.is_valid():
            sendsms(branchNumber,branchName,serviceRequestId,phone)
        serializer.save()
        
    def perform_update(self, serializer):
        print('*'*10,self.request.POST['attended_date'])
        updateStaus = service_request.objects.get(id= self.request.POST['service_request'])
        updateStaus.status = self.request.POST['status']
        updateStaus.save()
        return super().perform_update(serializer)

class UsedParts(viewsets.ModelViewSet):
    serializer_class = UsedParts
    queryset = used_parts.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        serviseRequest = self.request.query_params.get('service_request')
        if serviseRequest != None:
            return self.queryset.filter(service_request=serviseRequest)
        else:
            return self.queryset.all()

    def perform_create(self, serializer):
        return super().perform_create(serializer)


class ComplaintsJobCard(viewsets.ModelViewSet):
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

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def get_serializer_class(self):
        if self.action == 'list':
            return ViewComplaintsJobCard
        return ComplaintsJobCards

class AccessoriesJobCard(viewsets.ModelViewSet):
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

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def get_serializer_class(self):
        if self.action == 'list':
            return ViewAccessoriesJobCard
        return CreateAccessoriesJobCard

class FilterServiceRequest(viewsets.ModelViewSet):
    serializer_class = GetServiceRequest
    queryset = service_request.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        startDate = self.request.query_params.get('start_date')
        endDate = self.request.query_params.get('end_date')
        return self.queryset.filter(date__date__gte=startDate,date__date__lte=endDate,status='completed',branch=self.request.user.branch)
        
class Logs(viewsets.ModelViewSet):
    serializer_class = LogsSerializer
    queryset = logs.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user.email)
        
    def get_serializer_class(self):
        return LogsSerializer
    http_method_names = ['post',]

class GetCount(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request,format=None):
        branch = request.user.branch
        completed = service_request.objects.filter(status = 'completed',branch= branch).count()
        open = service_request.objects.filter(status = 'open',branch= branch).count()
        attended = service_request.objects.filter(status = 'attended',branch= branch).count()
        pending = service_request.objects.filter(status = 'pending',branch= branch).count()

        data = {
            'completed':completed,
            'open':open,
            'attended':attended,
            'pending':pending
        }
        return Response(data)

class User(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,format=None):
        user = request.user.email
        branchName = request.user.branch.name
        userSplit = user.split('@')
        data = userSplit[0]
        return Response({'user':data,'email':user,'branch':branchName})

    def delete(self,request,format=None):
        userId = request.POST['id']
        get_user_model().objects.get(id=userId).delete()
        return Response({'msg':True})

class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        self,request.user.auth_token.delete()
        return Response({'true':'msg'})