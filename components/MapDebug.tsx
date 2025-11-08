"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

interface MapDebugProps {
  address: string;
  lat: number;
  lng: number;
}

export default function MapDebug({ address, lat, lng }: MapDebugProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    console.log("MapDebug:", message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const dropForhemHQLabel = async (map: google.maps.Map, position: google.maps.LatLngLiteral) => {
    addLog("🏢 Creating AdvancedMarkerElement for Forhem HQ");

    try {
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

      // Center map on HQ and set appropriate zoom
      map.setCenter(position);
      map.setZoom(16);

      addLog("✅ Forhem HQ marker placed successfully");
    } catch (error) {
      addLog(`❌ Error creating AdvancedMarker: ${error}`);
      console.error("AdvancedMarker error:", error);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      addLog("🚀 Starting map initialization");

      // Check 1: DOM container exists and has dimensions
      if (!mapRef.current) {
        const errorMsg = "❌ mapRef.current is null - DOM container not ready";
        addLog(errorMsg);
        setError(errorMsg);
        return;
      }

      const rect = mapRef.current.getBoundingClientRect();
      addLog(`📏 Container dimensions: ${rect.width}x${rect.height}`);

      if (rect.width === 0 || rect.height === 0) {
        const errorMsg = `❌ Container has zero dimensions: ${rect.width}x${rect.height}`;
        addLog(errorMsg);
        setError(errorMsg);
        return;
      }

      // Check 2: API key exists
      const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      addLog(`🔑 API key exists: ${!!GOOGLE_MAPS_API_KEY}`);
      addLog(`🔑 API key length: ${GOOGLE_MAPS_API_KEY?.length || 0}`);

      if (!GOOGLE_MAPS_API_KEY) {
        const errorMsg = "❌ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing";
        addLog(errorMsg);
        setError(errorMsg);
        return;
      }

      // Check 3: Configure loader and import libraries
      addLog("📦 Configuring Google Maps loader");
      setOptions({
        key: GOOGLE_MAPS_API_KEY,
        v: 'weekly',
      });

      try {
        addLog("📥 Loading Google Maps library");
        await importLibrary('places');
        await importLibrary('geocoding');
        const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await importLibrary('marker') as any;
        addLog("✅ Google Maps library loaded successfully");

        if (isCancelled || !mapRef.current) {
          const errorMsg = "❌ Operation cancelled or container lost";
          addLog(errorMsg);
          return;
        }

        // Check 4: Create map instance
        addLog("🗺️ Creating map instance");
        mapInstance.current = new Map(mapRef.current, {
          center: { lat, lng },
          zoom: 16,
          mapId: "forhem-debug-map",
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
            }
          ]
        });

        addLog("✅ Map instance created successfully");

        // Add Forhem HQ pin with always-visible label
        addLog("📍 Adding Forhem Headquarters marker");
        await dropForhemHQLabel(mapInstance.current, { lat: 37.7817, lng: -122.4112 });
        addLog("🎉 Map initialization completed successfully!");

      } catch (err) {
        const errorMsg = `❌ Error initializing map: ${err}`;
        addLog(errorMsg);
        setError(errorMsg);
        console.error("MapDebug Error:", err);
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

  return (
    <div className="space-y-4">
      {/* Debug logs */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-48 overflow-y-auto">
        <h3 className="font-bold text-sm mb-2">🔍 Debug Logs:</h3>
        {logs.length === 0 ? (
          <p className="text-xs text-gray-500">No logs yet...</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">
              {log}
            </div>
          ))
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">❌ Error:</h3>
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Map container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg border-2 border-red-300 shadow-lg bg-green-50 dark:bg-green-900"
          style={{ backgroundColor: "#f0fdf4" }}
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
          DEBUG MODE
        </div>
      </div>
    </div>
  );
}