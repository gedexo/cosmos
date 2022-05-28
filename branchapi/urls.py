from django.http import request
from django.urls import path,include
from django.urls.resolvers import RoutePattern
from rest_framework import viewsets
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('technicians',views.Technician),
router.register('service-request',views.ServiceRequest),
router.register('create-service-request-branch',views.CreateServiceRequestsBranch),
router.register('get-service-request',views.GetServiceRequests),
router.register('brands',views.Brands),
router.register('wheelsize',views.WheelSize),
router.register('complaints',views.Complaints),
router.register('accessories',views.Accessories),
router.register('model-name',views.ModelName),
router.register('machine-type',views.MachineType),
router.register('model-no',views.ModelNo),
router.register('fitness-job-card',views.FitnessJobCard),
router.register('cycle-job-card',views.CycleJobCard),
router.register('badminton-job-card',views.BadmintonJobCard),
router.register('get-service-request-dashboard',views.GertServiceRequestToDashboard),
router.register('del-service-request',views.DelServiceRequest),
router.register('used-parts',views.UsedParts),
router.register('complaints-job-card',views.ComplaintsJobCard),
router.register('accessories-job-card',views.AccessoriesJobCard),
router.register('filter-requests',views.FilterServiceRequest),
router.register('print-cycle-jobcard',views.PrintCycleJobCard),
router.register('print-fitness-jobcard',views.PrintFitnessJobCard),
router.register('print-badminton-jobcard',views.PrintBadmintonJobCard),
router.register('logs',views.Logs),

urlpatterns = [
    path('api/',include(router.urls)),
    path('login/',views.CreateTokenView.as_view()),
    path('user-details/',views.User.as_view()),
    path('logout/',views.Logout.as_view()),
    path('count-requests/',views.GetCount.as_view()),
]