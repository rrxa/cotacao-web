# Generated by Django 4.2.19 on 2025-03-11 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cotacao', '0010_rename_valor_tarifaraio_valor_base_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarifaraio',
            name='valor_fixo',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
