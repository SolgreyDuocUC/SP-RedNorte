import { useState, useEffect } from 'react';
import { Hospital, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { typeLabels, typeStyles } from '../../../../mocks/mockFacilities';
import { facilitiesRemote, FacilityDTO } from '../../../../remotes/facilities.remote';

export function FacilitiesView() {
  const [facilities, setFacilities] = useState<FacilityDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    facilitiesRemote.getAll()
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading facilities:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-[#0096c7]" />
        <p>Cargando establecimientos de salud...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Establecimientos de Salud</h2>
        <p className="text-gray-600">Red de centros médicos disponibles</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="hospital">Hospitales</TabsTrigger>
          <TabsTrigger value="primary-care">Atención Primaria</TabsTrigger>
          <TabsTrigger value="specialized">Centros Especializados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {facilities.length === 0 ? (
            <p className="text-sm text-slate-500 italic p-4 text-center">No hay establecimientos registrados.</p>
          ) : (
            facilities.map((facility) => {
              const facilityType = facility.type || 'hospital';
              return (
                <Card key={facility.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Hospital className="h-8 w-8 text-white" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{facility.name}</h3>
                            <Badge
                              variant="outline"
                              className={typeStyles[facilityType as keyof typeof typeStyles] || ''}
                            >
                              {typeLabels[facilityType as keyof typeof typeLabels] || facilityType}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 shrink-0 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-900">{facility.address || 'Sin dirección registrada'}</p>
                              <p className="text-gray-600">
                                {facility.commune || ''}{facility.commune && facility.region ? ', ' : ''}{facility.region || ''}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-900">{facility.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-900">{facility.email || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Especialidades disponibles:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {facility.specialties && facility.specialties.length > 0 ? (
                              facility.specialties.map((specialty, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400 italic">Ninguna especialidad cargada</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="hospital" className="space-y-4">
          {facilities.filter((f) => f.type === 'hospital').length === 0 ? (
            <p className="text-sm text-slate-500 italic p-4 text-center">No hay hospitales registrados.</p>
          ) : (
            facilities
              .filter((f) => f.type === 'hospital')
              .map((facility) => (
                <Card key={facility.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Hospital className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                        <p className="text-sm text-gray-600">{facility.address || 'Sin dirección'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="primary-care" className="space-y-4">
          {facilities.filter((f) => f.type === 'primary-care').length === 0 ? (
            <p className="text-sm text-slate-500 italic p-4 text-center">No hay centros de atención primaria registrados.</p>
          ) : (
            facilities
              .filter((f) => f.type === 'primary-care')
              .map((facility) => (
                <Card key={facility.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                        <Hospital className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                        <p className="text-sm text-gray-600">{facility.address || 'Sin dirección'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="specialized" className="space-y-4">
          {facilities.filter((f) => f.type === 'specialized-center').length === 0 ? (
            <p className="text-sm text-slate-500 italic p-4 text-center">No hay centros especializados registrados.</p>
          ) : (
            facilities
              .filter((f) => f.type === 'specialized-center')
              .map((facility) => (
                <Card key={facility.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                        <Hospital className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                        <p className="text-sm text-gray-600">{facility.address || 'Sin dirección'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

