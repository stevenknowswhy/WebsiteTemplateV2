"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin, Shield } from "lucide-react";

interface GoogleMapProps {
  address: string;
  lat: number;
  lng: number;
}

export default function GoogleMap({ address, lat, lng }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropForhemHQLabel = async (map: google.maps.Map, position: google.maps.LatLngLiteral) => {
    console.log("GoogleMap Component: Creating custom marker for Forhem HQ");
    try {
      // Try AdvancedMarkerElement first with custom icon
      const { AdvancedMarkerElement } = await importLibrary('marker') as any;

      // Create custom icon element
      const iconContainer = document.createElement("div");
      iconContainer.style.display = "flex";
      iconContainer.style.alignItems = "center";
      iconContainer.style.justifyContent = "center";
      iconContainer.style.width = "40px";
      iconContainer.style.height = "40px";
      iconContainer.style.background = "linear-gradient(135deg, #059669, #047857)";
      iconContainer.style.borderRadius = "50%";
      iconContainer.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.4)";
      iconContainer.style.border = "3px solid white";
      iconContainer.style.position = "relative";

      // Add icon symbol
      const iconSymbol = document.createElement("div");
      iconSymbol.style.color = "white";
      iconSymbol.style.fontSize = "18px";
      iconSymbol.style.fontWeight = "bold";
      iconSymbol.style.textAlign = "center";
      iconSymbol.style.lineHeight = "1";
      iconSymbol.textContent = "⚡";

      // Add small label below
      const label = document.createElement("div");
      label.style.position = "absolute";
      label.style.bottom = "-22px";
      label.style.left = "50%";
      label.style.transform = "translateX(-50%)";
      label.style.background = "white";
      label.style.padding = "2px 6px";
      label.style.borderRadius = "4px";
      label.style.fontSize = "11px";
      label.style.fontWeight = "600";
      label.style.color = "#059669";
      label.style.border = "1px solid #059669";
      label.style.whiteSpace = "nowrap";
      label.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      label.textContent = "Forhem HQ";

      iconContainer.appendChild(iconSymbol);
      iconContainer.appendChild(label);

      new AdvancedMarkerElement({
        map,
        position,
        content: iconContainer,
        title: "Forhem PBC Headquarters - 55 9th St, San Francisco, CA 94103"
      });

      // Center map on HQ and set appropriate zoom
      map.setCenter(position);
      map.setZoom(16);

      console.log("GoogleMap Component: Custom icon AdvancedMarkerElement placed successfully");
    } catch (error) {
      console.warn("GoogleMap Component: AdvancedMarkerElement failed, falling back to standard Marker:", error);

      // Fallback to standard Marker with custom icon
      try {
        // Create custom SVG icon for fallback
        const customIcon = {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: "#059669",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 2,
          anchor: new google.maps.Point(12, 24),
          labelOrigin: new google.maps.Point(12, 10)
        };

        const marker = new google.maps.Marker({
          position,
          map,
          title: "Forhem PBC Headquarters - 55 9th St, San Francisco, CA 94103",
          icon: customIcon,
          label: {
            text: "⚡",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold"
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #059669; font-size: 16px; font-weight: bold;">
                ⚡ Forhem HQ
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

        // Center map on HQ and set appropriate zoom
        map.setCenter(position);
        map.setZoom(16);

        console.log("GoogleMap Component: Fallback custom Marker placed successfully");
      } catch (fallbackError) {
        console.error("GoogleMap Component: Even fallback Marker failed:", fallbackError);
      }
    }
  };

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      console.log("GoogleMap Component: Starting map initialization");

      // Check 1: DOM container exists and has dimensions
      if (!mapRef.current) {
        const errorMsg = "GoogleMap Component: mapRef.current is null - DOM container not ready";
        console.error(errorMsg);
        setError(errorMsg);
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      const rect = mapRef.current.getBoundingClientRect();
      console.log(`GoogleMap Component: Container dimensions: ${rect.width}x${rect.height}`);

      if (rect.width === 0 || rect.height === 0) {
        const errorMsg = `GoogleMap Component: Container has zero dimensions: ${rect.width}x${rect.height}`;
        console.error(errorMsg);
        setError(errorMsg);
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      // Check 2: API key exists
      const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      console.log(`GoogleMap Component: API key exists: ${!!GOOGLE_MAPS_API_KEY}`);
      console.log(`GoogleMap Component: API key length: ${GOOGLE_MAPS_API_KEY?.length || 0}`);
      console.log(`GoogleMap Component: API key value: ${GOOGLE_MAPS_API_KEY?.substring(0, 10)}...`);

      if (!GOOGLE_MAPS_API_KEY) {
        const errorMsg = "GoogleMap Component: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing";
        console.error(errorMsg);
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      // Check 3: Configure loader and import libraries
      console.log("GoogleMap Component: Configuring Google Maps loader");
      setOptions({
        key: GOOGLE_MAPS_API_KEY,
        v: 'weekly',
      });

      try {
        console.log("GoogleMap Component: Loading Google Maps library");
        await importLibrary('places');
        await importLibrary('geocoding');
        const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
        console.log("GoogleMap Component: Google Maps library loaded successfully");

        if (isCancelled || !mapRef.current) {
          console.log("GoogleMap Component: Operation cancelled or container lost");
          return;
        }

        // Check 4: Create map instance
        console.log("GoogleMap Component: Creating map instance");
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

        console.log("GoogleMap Component: Map instance created successfully");

        // Add Forhem HQ pin with custom icon
        console.log("GoogleMap Component: Placing marker at 55 9th St San Francisco");
        await dropForhemHQLabel(mapInstance.current, { lat: 37.7817, lng: -122.4112 });
        console.log("GoogleMap Component: Map initialization completed successfully!");

        setIsLoading(false);
      } catch (error) {
        const errorMsg = `GoogleMap Component: Error initializing map: ${error}`;
        console.error(errorMsg);
        setError(errorMsg);
        setLoadError(true);
        setIsLoading(false);
      }
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initMap();
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
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

  return (
    <div className="relative">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

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