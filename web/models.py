from sre_constants import BRANCH
from django.db import models
from tinymce.models import HTMLField



class AboutBranch(models.Model):
    BRANCH_CHOICES = ("CALICUT", "CALICUT"),("KANNUR", "KANNUR"),("COCHIN", "COCHIN"),("MANJERI", "MANJERI"),("THRISSUR", "THRISSUR"),("TRIVANDRUM", "TRIVANDRUM"),("CALICUT-EXPRESS-STORE", "CALICUT-EXPRESS STORE"),("MAHE", "MAHE"),("KARAMA", "KARAMA"),("MADINA-MALL", "MADINA MALL"),

    branches = models.CharField(max_length=128, choices=BRANCH_CHOICES) 
    sports_content = HTMLField(blank=True,null=True)
    cyclestore_content = HTMLField(blank=True,null=True)
    fitness = HTMLField(blank=True,null=True)

    def __str__(self):
        return str(self.branches)

