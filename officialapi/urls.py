from django.urls import path,include
from rest_framework import viewsets
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register('branch',views.Branch)
router.register('branch-details',views.BranchRequests),
router.register('service-requests',views.GetBranchServiceRequests),
router.register('products',views.Products),
router.register('slider',views.Slider),
router.register('service-requests-status',views.GetBranchServiceRequestsBasedStatus),
router.register('reports',views.GetReports),
router.register('blog',views.Blog),
router.register('banner',views.Banner),
router.register('brand',views.GetBrands),
router.register('wheelsize',views.GetWheelSizes),
router.register('model-name',views.GetModelName),
router.register('technician',views.GetTechnicians),
router.register('model-no',views.ModelNo),
router.register('machine-type',views.MachineType),
router.register('cycle',views.GetCycleJobCards),
router.register('badminton',views.GetBadmintonJobCards),
router.register('fitness',views.GetFitnessJobCards),
router.register('used-parts',views.UsedParts),
router.register('accessories',views.AccessoriesJobCards),
router.register('complaints',views.ComplaintsJobCardView),
router.register('brands',views.Brands),
router.register('ads',views.Ads),
router.register('logs',views.GetLogs),
router.register('print-cycle-jobcard',views.PrintCycleJobCard),
router.register('print-fitness-jobcard',views.PrintFitnessJobCard),
router.register('print-badminton-jobcard',views.PrintBadmintonJobCard),

router.register('about-branch',views.Aboutbranch_view)


urlpatterns = [
    path('official/',include(router.urls)),
    path('login/',views.CreateTokenView.as_view()),
    path('user/',views.CreateUserView.as_view()),
    path('user-details/',views.DeleteUser.as_view()),
    path('logout/',views.Logout.as_view()),
    path('get-count/',views.GetCount.as_view()),
    path('admin-user/',views.CreateAdminUserView.as_view()),
    path('mtalkz/',views.MtalkzSmsBalance.as_view()),
]