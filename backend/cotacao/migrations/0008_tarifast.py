# Generated by Django 4.2.19 on 2025-03-08 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cotacao', '0007_alter_cotacao_valor_final'),
    ]

    operations = [
        migrations.CreateModel(
            name='TarifaST',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=10, unique=True)),
                ('tarifa_ate_5kg', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tarifa_por_kg_adicional', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
