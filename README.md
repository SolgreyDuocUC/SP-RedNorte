# 1. Estructura de ramas:

main            → Producción (estable)
preprod         → Pre-producción (validación final)
qa              → Pruebas (testing técnico)
dev-Solgrey     → Desarrollo Solgrey
dev-Martin      → Desarrollo Martin

# 2. Estrategia de desarrollo:  

1. Desarrollo individual en ramas dev-Solgrey y dev-Martin
2. Merge a qa cuando esté listo
3. Testing en qa
4. Merge a preprod cuando esté listo
5. Testing en preprod
6. Merge a main cuando esté listo
7. Despliegue en producción

# 3. Git Flow simplificado basado en entornos:

    No es Git Flow puro
    No es GitHub Flow
    Es una adaptación práctica enfocada en control y validación progresiva

# 4. Reglas de Pull Requests (PR):

    Siempre PR desde dev-Solgrey o dev-Martin → qa
    Siempre PR desde qa → preprod
    Siempre PR desde preprod → main
    Nunca PR directo a main
    Nunca PR directo a preprod
    Nunca PR directo a qa
    Nunca PR directo a dev-Solgrey
    Nunca PR directo a dev-Martin

# 5. Reglas de Merge:

    Nunca hacer merge directo
    Siempre hacer merge con PR
    Siempre hacer merge con revisión
    Siempre hacer merge con testing
    Siempre hacer merge con validación
    Siempre hacer merge con aprobación
    Siempre hacer merge con documentación
    Siempre hacer merge con pruebas
    Siempre hacer merge con despliegue
    Siempre hacer merge con monitoreo
    Siempre hacer merge con rollback
    Siempre hacer merge con recuperación
    Siempre hacer merge con recuperación
    