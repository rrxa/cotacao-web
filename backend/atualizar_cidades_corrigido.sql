
-- Atualização corrigida dos códigos ST e prazos para todas as cidades

UPDATE cotacao_cidade 
SET st_codigo = CASE 
    WHEN nome = 'Porto de Pedras' AND uf = 'AL' THEN 'ST84'
    WHEN nome = 'Rio Branco' AND uf = 'AC' THEN 'ST0'
    WHEN nome = 'Maceió' AND uf = 'AL' THEN 'ST84'
    WHEN nome = 'São Paulo' AND uf = 'SP' THEN 'ST33'
    WHEN nome = 'Recife' AND uf = 'PE' THEN 'ST114'
    WHEN nome = 'Goiânia' AND uf = 'GO' THEN 'ST55'
    WHEN nome = 'Curitiba' AND uf = 'PR' THEN 'ST42'
    WHEN nome = 'Manaus' AND uf = 'AM' THEN 'ST111'
    WHEN nome = 'Belém' AND uf = 'PA' THEN 'ST143'
    WHEN nome = 'Porto Alegre' AND uf = 'RS' THEN 'ST136'
    WHEN nome = 'Salvador' AND uf = 'BA' THEN 'ST79'
    WHEN nome = 'Fortaleza' AND uf = 'CE' THEN 'ST96'
    WHEN nome = 'Belo Horizonte' AND uf = 'MG' THEN 'ST55'
    WHEN nome = 'Vitória' AND uf = 'ES' THEN 'ST136'
    ELSE st_codigo
END,
prazo_base = CASE 
    WHEN iata = 'AJU' THEN 3
    WHEN iata = 'BEL' THEN 3
    WHEN iata = 'BNU' THEN 2
    WHEN iata = 'BPS' THEN 2
    WHEN iata = 'BSB' THEN 2
    WHEN iata = 'BVB' THEN 7
    WHEN iata = 'CGB' THEN 3
    WHEN iata = 'CGH' THEN 2
    WHEN iata = 'CGR' THEN 2
    WHEN iata = 'CNF' THEN 2
    WHEN iata = 'CWB' THEN 2
    WHEN iata = 'CXJ' THEN 2
    WHEN iata = 'FLN' THEN 2
    WHEN iata = 'FOR' THEN 3
    WHEN iata = 'GIG' THEN 2
    WHEN iata = 'GRU' THEN 2
    WHEN iata = 'IGU' THEN 2
    WHEN iata = 'IMP' THEN 3
    WHEN iata = 'IOS' THEN 3
    WHEN iata = 'JOI' THEN 2
    WHEN iata = 'JPA' THEN 3
    WHEN iata = 'LDB' THEN 2
    WHEN iata = 'MAB' THEN 5
    WHEN iata = 'MAO' THEN 5
    WHEN iata = 'MCP' THEN 7
    WHEN iata = 'MCZ' THEN 2
    WHEN iata = 'MGF' THEN 2
    WHEN iata = 'NAT' THEN 2
    WHEN iata = 'NVT' THEN 2
    WHEN iata = 'PLU' THEN 2
    WHEN iata = 'PMW' THEN 3
    WHEN iata = 'POA' THEN 2
    WHEN iata = 'VDC' THEN 3
    WHEN iata = 'PVH' THEN 7
    WHEN iata = 'RAO' THEN 3
    WHEN iata = 'RBR' THEN 7
    WHEN iata = 'REC' THEN 3
    WHEN iata = 'SDU' THEN 2
    WHEN iata = 'SJK' THEN 2
    WHEN iata = 'SJP' THEN 2
    WHEN iata = 'SLZ' THEN 3
    WHEN iata = 'SSA' THEN 2
    WHEN iata = 'STM' THEN 5
    WHEN iata = 'THE' THEN 3
    WHEN iata = 'UDI' THEN 2
    WHEN iata = 'VCP' THEN 2
    WHEN iata = 'VIX' THEN 2
    WHEN iata = 'GYN' THEN 2
    WHEN iata = 'XAP' THEN 2
    ELSE prazo_base
END;
