RNF01	Seguridad	MS Usuarios	Autenticación segura	JWT + OAuth2	Manejo de sesión y redirección	Tokens válidos / expiración
RNF02	Seguridad	API Gateway	Autorización por roles	Validación de JWT en cada request	Render condicional por rol	Accesos restringidos
RNF03	Seguridad	Backend Global	Protección de datos	Encriptación (HTTPS + TLS)	Ocultar datos sensibles en UI	Cumplimiento OWASP
RNF04	Seguridad	MS Usuarios	Validación identidad (RUN)	Integración API externa	Validación en tiempo real	% errores RUN inválido
RNF05	Seguridad	Backend Global	Manejo de sesiones	Expiración automática de JWT	Auto logout + refresh token	Tiempo de sesión
RNF06	Rendimiento	MS Agenda	Generación de slots	Procesos batch optimizados	Carga rápida de calendario	Tiempo < 2 seg
RNF07	Rendimiento	MS Reservas	Manejo de concurrencia	Lock optimista / Transacciones	Mensaje “hora no disponible”	Cero dobles reservas
RNF08	Rendimiento	Backend Global	Respuesta rápida API	Cache (Redis opcional)	UI fluida sin delays	< 500ms por request
RNF09	Escalabilidad	Arquitectura	Microservicios	Contenedores (Docker)	Independencia de módulos UI	Escalado horizontal
RNF10	Escalabilidad	MS Notificaciones	Procesos asíncronos	Cola de eventos (RabbitMQ)	Notificaciones no bloqueantes	Tiempo de entrega
RNF11	Disponibilidad	Backend Global	Alta disponibilidad	Deploy en nube (AWS/Azure)	Sistema siempre accesible	99.9% uptime
RNF12	Disponibilidad	MS Reservas	Tolerancia a fallos	Circuit Breaker	Mensajes de error amigables	Sin caída total del flujo
RNF13	Usabilidad	Frontend	Navegación clara	Estructura de rutas lógica	Máx 3 niveles navegación	Test de usabilidad
RNF14	Usabilidad	Frontend	Feedback inmediato	Respuestas API rápidas	Alerts (éxito/error)	Tiempo respuesta UI
RNF15	Usabilidad	Frontend	Formularios simples	Validaciones backend + frontend	Validación inline	% reducción errores
RNF16	Usabilidad	Frontend	Diseño responsivo	CSS adaptable (Tailwind/MUI)	Mobile & Tablet Friendly	Layout adaptable
RNF17	Seguridad	Frontend	Protección visual	Ocultamiento parcial (ej: RUT)	Máscaras en campos UI	Datos no expuestos
RNF18	Mantenibilidad	Backend	Código modular	Arquitectura Limpia	Componentes reutilizables	Bajo acoplamiento
RNF19	Mantenibilidad	Backend	Uso de patrones	Factory, Repository, DTO	Separación lógica de negocio	Código extensible
RNF20	Testabilidad	Backend	Pruebas unitarias	JUnit + Mockito	UI estable bajo tests	Cobertura ≥ 60%
RNF21	Testabilidad	DevOps	Integración continua	Pipeline CI/CD	Deploy automático tras tests	Pasaje exitoso de pipes
RNF22	Seguridad	Backend	Validación de inputs	Sanitización de datos	Validación en formularios	Prevención XSS/SQLi
RNF23	Rendimiento	MS Reportes	Optimización consultas	Queries agregadas	Dashboard fluido	Tiempo carga < 3 seg
RNF24	Auditoría	Backend	Registro de acciones	Logs de eventos	Historial visible (Audit Log)	Trazabilidad completa
RNF25	Interoperabilidad	Integración	Estándar FHIR	Recursos HL7 FHIR	Consistencia de modelos de datos	Compatibilidad sistemas
RNF26	Seguridad	API Gateway	Protección endpoints	Rate limiting	Mensajes de límite excedido	Prevención de abuso
RNF27	Disponibilidad	MS Notificaciones	Entrega garantizada	Retry automático	Reintentos invisibles al usuario	% entrega exitoso
RNF28	Escalabilidad	Backend	Separación BFF	Backend for Frontend	UI desacoplada de lógica pesada	Independencia de capas
RNF29	Rendimiento	Frontend	Optimización render	Lazy loading / Memoization	Carga progresiva de módulos	Tiempo carga inicial bajo
RNF30	Usabilidad	Frontend	Estados visuales	Badges y colores estándar	UX intuitiva	Comprensión del usuario

ID	Microservicio (Backend)	Requisito Funcional (Backend)	Funcionalidad Frontend (React)	Recurso FHIR / Lógica Técnica
RF01	MS Usuarios	Registro de usuarios (Paciente y Staff)	Formulario con validación RUN en tiempo real	Patient, Practitioner
RF02	MS Usuarios	Autenticación de usuarios	Login con manejo de errores y feedback inmediato	JWT + API Gateway
RF03	MS Usuarios	Autorización basada en roles	Renderizado dinámico de vistas según rol	PractitionerRole
RF04	MS Usuarios	Gestión de usuarios	Panel admin CRUD usuarios	Patient / Practitioner
RF05	MS Usuarios	Activación/Desactivación de cuentas	Toggle estado usuario en UI	Flag active
RF06	MS Centros	Gestión de organizaciones	Vista jerárquica de red	Organization
RF07	MS Centros	Gestión de establecimientos	CRUD centros de salud	Location
RF08	MS Centros	Asociación profesional-centro	Selector de centros por profesional	PractitionerRole
RF09	MS Agenda	Configuración de disponibilidad médica	Calendario editable por admin	Schedule
RF10	MS Agenda	Generación automática de slots	Visualización de bloques disponibles	Slot (free/busy)
RF11	MS Agenda	Bloqueo de agenda	UI para bloquear horarios	Slot (status=blocked)
RF12	MS Agenda	Consulta de disponibilidad	Buscador de horas (filtros)	Query Slot
RF13	MS Reservas	Creación de citas	Wizard de reserva paso a paso	Appointment (booked)
RF14	MS Reservas	Validación de disponibilidad en tiempo real	Mensaje “hora ya tomada”	Control concurrencia
RF15	MS Reservas	Reagendamiento de citas	UI para cambiar fecha/hora	Update Appointment
RF16	MS Reservas	Cancelación de citas	Modal con motivo	Appointment (cancelled)
RF17	MS Reservas	Registro de motivo de cancelación	Campo obligatorio en UI	Metadata adicional
RF18	MS Reservas	Gestión de lista de espera	Vista de pacientes en espera	Cola priorizada
RF19	MS Reservas	Priorización automática/manual	UI con badges de prioridad	Algoritmo prioridad
RF20	MS Reservas	Reasignación automática	Banner de reasignación	Evento async + matching
RF21	MS Reservas	Confirmación de reasignación	Botones aceptar/rechazar	Update Appointment
RF22	MS Reservas	Consulta de estado de atención	Timeline visual	Estados Appointment
RF23	MS Reservas	Actualización de estado	Cambio manual/admin	Máquina de estados
RF24	MS Reservas	Búsqueda de pacientes	Barra de búsqueda global	Query Patient
RF25	MS Reservas	Asociación cita-paciente-slot	Visualización de relación	FK lógico Patient-Slot
RF26	MS Urgencias	Registro de ingreso urgencia	Formulario rápido triage	Encounter
RF27	MS Urgencias	Clasificación triage C1-C5	Colores por prioridad	Priority field
RF28	MS Urgencias	Monitor de sala de espera	Pantalla tipo dashboard	Query Encounter
RF29	MS Ficha Clínica	Registro de atención médica	Formulario clínico	Encounter
RF30	MS Ficha Clínica	Registro de signos vitales	Inputs estructurados	Observation
RF31	MS Ficha Clínica	Registro de diagnóstico	Selector CIE-10	Condition
RF32	MS Ficha Clínica	Consulta historial clínico	Timeline clínica	Query Condition/Observation
RF33	MS Ficha Clínica	Limitación historial (1 año)	Filtro automático	Query con rango fechas
RF34	MS Notificaciones	Envío de notificaciones	Campana + alertas	Communication
RF35	MS Notificaciones	Notificación de cita creada	Confirmación visual	Evento Appointment
RF36	MS Notificaciones	Notificación de cancelación	Mensaje automático	Evento cancel
RF37	MS Notificaciones	Notificación de reasignación	Banner + push	Evento async
RF38	MS Notificaciones	Registro de envío	Historial notificaciones	Log Communication
RF39	MS Reportes	Generación de reportes	Panel exportable	Aggregations
RF40	MS Reportes	Indicadores KPI	Dashboard admin	Métricas calculadas
RF41	MS Reportes	Métrica tiempo de espera	Gráfico	Diff fechas
RF42	MS Reportes	Métrica cancelaciones	Contador	Query Appointment
RF43	MS Reportes	Métrica reasignaciones	Indicador	Eventos
RF44	MS Integración	Validación RUN externa	Feedback en UI	API externa
RF45	MS Integración	Consulta previsión (Fonasa/Isapre)	Badge previsional	API externa
RF46	MS Seguridad	Protección de endpoints	Manejo errores frontend	API Gateway
RF47	MS Seguridad	Manejo de sesión	Auto logout	JWT Expiration
RF48	MS Paciente	Registro de paciente	Formulario de ingreso de datos personales	Patient
RF49	MS Paciente	Actualización de datos del paciente	Edición de perfil paciente	Patient (update)
RF50	MS Paciente	Consulta de paciente por RUN	Buscador con autocompletado	Query Patient (identifier)
RF51	MS Paciente	Consulta de paciente por ID	Vista perfil paciente	Query Patient (id)
RF52	MS Paciente	Gestión de contacto del paciente	Formulario contacto (teléfono/email)	Patient.telecom
RF53	MS Paciente	Gestión de dirección	Formulario dirección paciente	Patient.address
RF54	MS Paciente	Gestión de previsión	Visualización previsión (Fonasa/Isapre)	Extension Coverage / Coverage
RF55	MS Paciente	Asociación paciente-previsión	Selector previsión en UI	Coverage + Patient link
RF56	MS Paciente	Validación de datos obligatorios	Validación en tiempo real en formulario	Reglas backend + DTO validation
RF57	MS Paciente	Desactivación lógica de paciente	Toggle estado paciente	Patient.active
RF58	MS Paciente	Listado de pacientes	Paginación + filtros en tabla	Query Patient (pagination)
RF59	MS Paciente	Búsqueda avanzada de pacientes	Filtros por nombre, RUN, previsión	Search API + parámetros
RF60	MS Paciente	Integración con MS Reservas	Selección de paciente en agendamiento	Referencia Patient.id
RF61	MS Paciente	Integración con Ficha Clínica	Consulta datos base paciente	Referencia Patient
RF62	MS Paciente	Auditoría de cambios del paciente	Historial de modificaciones	Log + versionado
RF63	MS Paciente	Normalización de datos (RUN, nombre)	Feedback visual de formato	Reglas de negocio backend

ID	Categoría	Microservicio / Capa	Requisito No Funcional	Implementación Backend	Impacto en Frontend (React)	Métrica / Validación
RNF01	Seguridad	MS Usuarios	Autenticación segura	JWT + OAuth2	Manejo de sesión y redirección	Tokens válidos / expiración
RNF02	Seguridad	API Gateway	Autorización por roles	Validación de JWT en cada request	Render condicional por rol	Accesos restringidos
RNF03	Seguridad	Backend Global	Protección de datos	Encriptación (HTTPS + TLS)	Ocultar datos sensibles en UI	Cumplimiento OWASP
RNF04	Seguridad	MS Usuarios	Validación identidad (RUN)	Integración API externa	Validación en tiempo real	% errores RUN inválido
RNF05	Seguridad	Backend Global	Manejo de sesiones	Expiración automática de JWT	Auto logout + refresh token	Tiempo de sesión
RNF06	Rendimiento	MS Agenda	Generación de slots	Procesos batch optimizados	Carga rápida de calendario	Tiempo < 2 seg
RNF07	Rendimiento	MS Reservas	Manejo de concurrencia	Lock optimista / Transacciones	Mensaje “hora no disponible”	Cero dobles reservas
RNF08	Rendimiento	Backend Global	Respuesta rápida API	Cache (Redis opcional)	UI fluida sin delays	< 500ms por request
RNF09	Escalabilidad	Arquitectura	Microservicios	Contenedores (Docker)	Independencia de módulos UI	Escalado horizontal
RNF10	Escalabilidad	MS Notificaciones	Procesos asíncronos	Cola de eventos (RabbitMQ)	Notificaciones no bloqueantes	Tiempo de entrega
RNF11	Disponibilidad	Backend Global	Alta disponibilidad	Deploy en nube (AWS/Azure)	Sistema siempre accesible	99.9% uptime
RNF12	Disponibilidad	MS Reservas	Tolerancia a fallos	Circuit Breaker	Mensajes de error amigables	Sin caída total del flujo
RNF13	Usabilidad	Frontend	Navegación clara	Estructura de rutas lógica	Máx 3 niveles navegación	Test de usabilidad
RNF14	Usabilidad	Frontend	Feedback inmediato	Respuestas API rápidas	Alerts (éxito/error)	Tiempo respuesta UI
RNF15	Usabilidad	Frontend	Formularios simples	Validaciones backend + frontend	Validación inline	% reducción errores
RNF16	Usabilidad	Frontend	Diseño responsivo	CSS adaptable (Tailwind/MUI)	Mobile & Tablet Friendly	Layout adaptable
RNF17	Seguridad	Frontend	Protección visual	Ocultamiento parcial (ej: RUT)	Máscaras en campos UI	Datos no expuestos
RNF18	Mantenibilidad	Backend	Código modular	Arquitectura Limpia	Componentes reutilizables	Bajo acoplamiento
RNF19	Mantenibilidad	Backend	Uso de patrones	Factory, Repository, DTO	Separación lógica de negocio	Código extensible
RNF20	Testabilidad	Backend	Pruebas unitarias	JUnit + Mockito	UI estable bajo tests	Cobertura ≥ 60%
RNF21	Testabilidad	DevOps	Integración continua	Pipeline CI/CD	Deploy automático tras tests	Pasaje exitoso de pipes
RNF22	Seguridad	Backend	Validación de inputs	Sanitización de datos	Validación en formularios	Prevención XSS/SQLi
RNF23	Rendimiento	MS Reportes	Optimización consultas	Queries agregadas	Dashboard fluido	Tiempo carga < 3 seg
RNF24	Auditoría	Backend	Registro de acciones	Logs de eventos	Historial visible (Audit Log)	Trazabilidad completa
RNF25	Interoperabilidad	Integración	Estándar FHIR	Recursos HL7 FHIR	Consistencia de modelos de datos	Compatibilidad sistemas
RNF26	Seguridad	API Gateway	Protección endpoints	Rate limiting	Mensajes de límite excedido	Prevención de abuso
RNF27	Disponibilidad	MS Notificaciones	Entrega garantizada	Retry automático	Reintentos invisibles al usuario	% entrega exitoso
RNF28	Escalabilidad	Backend	Separación BFF	Backend for Frontend	UI desacoplada de lógica pesada	Independencia de capas
RNF29	Rendimiento	Frontend	Optimización render	Lazy loading / Memoization	Carga progresiva de módulos	Tiempo carga inicial bajo
RNF30	Usabilidad	Frontend	Estados visuales	Badges y colores estándar	UX intuitiva	Comprensión del usuario