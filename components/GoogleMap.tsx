"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin, Shield, AlertCircle } from "lucide-react";

interface GoogleMapProps {
  address: string;
  lat: number;
  lng: number;
}

export default function GoogleMap({ address, lat, lng }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dropForhemHQLabel = async (map: google.maps.Map, position: google.maps.LatLngLiteral) => {
    try {
      // Try AdvancedMarkerElement first
      const { AdvancedMarkerElement } = await importLibrary('marker') as any;

      const label = document.createElement("div");
      label.style.padding = "6px 12px";
      label.style.borderRadius = "8px";
      label.style.background = "white";
      label.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
      label.style.font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      label.style.color = "#059669";
      label.style.border = "2px solid #059669";
      label.style.whiteSpace = "nowrap";
      label.textContent = "Forhem Headquarters";

      new AdvancedMarkerElement({
        map,
        position,
        content: label,
        title: "Forhem PBC Headquarters - 55 9th St, San Francisco, CA 94103"
      });

      console.log("GoogleMap Component: AdvancedMarkerElement placed successfully");
    } catch (error) {
      console.warn("GoogleMap Component: AdvancedMarkerElement failed, falling back to standard Marker:", error);

      // Fallback to standard Marker
      try {
        const marker = new google.maps.Marker({
          position,
          map,
          title: "Forhem PBC Headquarters - 55 9th St, San Francisco, CA 94103",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#059669",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #059669; font-size: 16px; font-weight: bold;">
                Forhem PBC Headquarters
              </h3>
              <p style="margin: 0; color: #374151; font-size: 14px;">
                55 9th Street, San Francisco, CA 94103
              </p>
            </div>
          `
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        // Auto-open info window
        infoWindow.open(map, marker);

        console.log("GoogleMap Component: Fallback Marker placed successfully");
      } catch (fallbackError) {
        console.error("GoogleMap Component: Even fallback Marker failed:", fallbackError);
      }
    }

    // Center map on HQ and set appropriate zoom
    map.setCenter(position);
    map.setZoom(16);
  };

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      if (!mapRef.current) return; // DOM not ready yet

      const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      // Skip Google Maps if no API key is provided
      if (!GOOGLE_MAPS_API_KEY) {
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      try {
        setOptions({
          key: GOOGLE_MAPS_API_KEY,
          v: 'weekly',
        });

        await importLibrary('places');
        await importLibrary('geocoding');
        const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await importLibrary('marker') as any;

        if (isCancelled || !mapRef.current) return;

        // Avoid re-initializing on HMR
        if (!mapInstance.current) {
          mapInstance.current = new Map(mapRef.current, {
            center: { lat, lng },
            zoom: 16,
            mapId: "forhem-map",
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ color: "#f0f9ff" }]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#0ea5e9" }]
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#86efac" }]
              }
            ]
          });

          // Add Forhem HQ pin with always-visible label
          console.log("GoogleMap Component: Placing marker at 55 9th St San Francisco");
          await dropForhemHQLabel(mapInstance.current, { lat: 37.7817, lng: -122.4112 });
          console.log("GoogleMap Component: Map initialized successfully");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("GoogleMap Component: Error initializing map:", error);
        if (!isCancelled) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    }

    initMap();
    return () => { isCancelled = true; };
  }, [lat, lng, address]);

  // Fallback static map component
  if (loadError) {
    return (
      <div className="relative">
        <div className="w-full h-96 rounded-lg border-2 border-green-200 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="flex justify-center mb-4">
              <div className="size-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {address}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Forhem PBC Headquarters
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
              <Shield className="h-3 w-3" />
              <span>Public Benefit Corporation</span>
            </div>
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Interactive map available with Google Maps API
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="relative">
        <div className="w-full h-96 rounded-lg border-2 border-green-200 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border-2 border-green-200 shadow-lg"
        style={{ backgroundColor: "#f0fdf4" }}
      />
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-xs">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-3 h-3 bg-green-600 rounded-full border-2 border-white"></div>
          <span className="text-sm font-semibold text-gray-900">Forhem PBC HQ</span>
        </div>
        <p className="text-xs text-gray-600">{address}</p>
      </div>
    </div>
  );
}