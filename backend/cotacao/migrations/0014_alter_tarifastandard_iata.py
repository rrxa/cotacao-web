# Generated by Django 4.2.19 on 2025-03-17 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cotacao', '0013_alter_tarifastandard_iata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarifastandard',
            name='iata',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tarifas_standard', to='cotacao.iata'),
        ),
    ]
