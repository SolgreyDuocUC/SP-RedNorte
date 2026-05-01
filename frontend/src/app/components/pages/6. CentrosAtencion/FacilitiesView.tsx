import { Hospital, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { mockFacilities, typeLabels, typeStyles } from '../../../../mocks/mockFacilities';

export function FacilitiesView() {
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
          {mockFacilities.map((facility) => (
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
                          className={typeStyles[facility.type as keyof typeof typeStyles]}
                        >
                          {typeLabels[facility.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 shrink-0 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-gray-900">{facility.address}</p>
                          <p className="text-gray-600">{facility.commune}, {facility.region}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{facility.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{facility.email}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Especialidades disponibles:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {facility.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hospital" className="space-y-4">
          {mockFacilities
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
                      <p className="text-sm text-gray-600">{facility.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="primary-care" className="space-y-4">
          {mockFacilities
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
                      <p className="text-sm text-gray-600">{facility.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="specialized" className="space-y-4">
          {mockFacilities
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
                      <p className="text-sm text-gray-600">{facility.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
