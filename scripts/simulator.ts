#!/usr/bin/env node

/**
 * Pilot Data Stream Simulator
 *
 * Generates realistic synthetic telemetry data for testing the analytics dashboard.
 * This simulates a network of smart city nodes with various metrics and behaviors.
 *
 * Features:
 * - Realistic node telemetry patterns
 * - Configurable noise and variance
 * - Multiple node types and locations
 * - Error simulation and recovery
 * - Daily/weekly usage patterns
 * - Geographically distributed data
 * - Performance metrics and alerts
 */

import { createClient } from '@supabase/supabase-js';
import { program } from 'commander';
import chalk from 'chalk';
import { performance } from 'perf_hooks';

// Configuration
interface SimulatorConfig {
  supabaseUrl: string;
  supabaseServiceKey: string;
  nodeCount: number;
  intervalSeconds: number;
  durationMinutes: number;
  noiseLevel: number;
  errorRate: number;
  enableRealtime: boolean;
  verbose: boolean;
  regions: string[];
}

// Node configuration
interface NodeConfig {
  id: string;
  name: string;
  type: 'street_light' | 'traffic_sensor' | 'environmental' | 'wifi_hotspot' | 'energy_node';
  location: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  partner: string;
  baselineMetrics: {
    energyGeneration: number;
    powerConsumption: number;
    networkRequests: number;
    temperature: number;
    humidity: number;
    responseTime: number;
    uptime: number;
  };
  varianceFactors: {
    daily: number;
    weekly: number;
    weather: number;
    events: number;
  };
}

// Cities and partners for realistic simulation
const CITIES = [
  { name: 'San Francisco', state: 'CA', country: 'US', lat: 37.7749, lng: -122.4194 },
  { name: 'Seattle', state: 'WA', country: 'US', lat: 47.6062, lng: -122.3321 },
  { name: 'Austin', state: 'TX', country: 'US', lat: 30.2672, lng: -97.7431 },
  { name: 'Boston', state: 'MA', country: 'US', lat: 42.3601, lng: -71.0589 },
  { name: 'Denver', state: 'CO', country: 'US', lat: 39.7392, lng: -104.9903 }
];

const PARTNERS = [
  'City Infrastructure Dept',
  'Smart Parking Systems',
  'Green Energy Solutions',
  'Urban Tech Partners',
  'Municipal Services Co'
];

const NODE_TYPES: Array<NodeConfig['type']> = [
  'street_light', 'traffic_sensor', 'environmental', 'wifi_hotspot', 'energy_node'
];

class TelemetrySimulator {
  private config: SimulatorConfig;
  private supabase: any;
  private nodes: NodeConfig[] = [];
  private isRunning = false;
  private startTime = 0;
  private metricsSent = 0;

  constructor(config: SimulatorConfig) {
    this.config = config;
    this.supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
    this.generateNodes();
  }

  private generateNodes(): void {
    this.nodes = [];

    for (let i = 0; i < this.config.nodeCount; i++) {
      const city = CITIES[i % CITIES.length];
      const nodeType = NODE_TYPES[i % NODE_TYPES.length];
      const partner = PARTNERS[i % PARTNERS.length];

      const node: NodeConfig = {
        id: `sim-node-${String(i + 1).padStart(3, '0')}`,
        name: `${city.name.replace(' ', '')}-${nodeType}-${String(i + 1).padStart(2, '0')}`,
        type: nodeType,
        location: {
          city: city.name,
          state: city.state,
          country: city.country,
          latitude: city.lat + (Math.random() - 0.5) * 0.1, // Small geographic variance
          longitude: city.lng + (Math.random() - 0.5) * 0.1
        },
        partner,
        baselineMetrics: this.getBaselineMetrics(nodeType),
        varianceFactors: {
          daily: 0.2 + Math.random() * 0.3,
          weekly: 0.1 + Math.random() * 0.2,
          weather: 0.1 + Math.random() * 0.2,
          events: 0.05 + Math.random() * 0.15
        }
      };

      this.nodes.push(node);
    }

    if (this.config.verbose) {
      console.log(chalk.blue(`Generated ${this.nodes.length} nodes`));
      console.log(chalk.blue(`Node distribution:`));
      this.nodes.reduce((acc, node) => {
        acc[node.type] = (acc[node.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    }
  }

  private getBaselineMetrics(nodeType: NodeConfig['type']): NodeConfig['baselineMetrics'] {
    switch (nodeType) {
      case 'street_light':
        return {
          energyGeneration: 5 + Math.random() * 10, // kWh
          powerConsumption: 2 + Math.random() * 3,
          networkRequests: 100 + Math.random() * 200,
          temperature: 20 + Math.random() * 15,
          humidity: 40 + Math.random() * 30,
          responseTime: 50 + Math.random() * 100,
          uptime: 99.5 + Math.random() * 0.5
        };

      case 'traffic_sensor':
        return {
          energyGeneration: 2 + Math.random() * 5,
          powerConsumption: 5 + Math.random() * 10,
          networkRequests: 500 + Math.random() * 1000,
          temperature: 15 + Math.random() * 20,
          humidity: 30 + Math.random() * 40,
          responseTime: 25 + Math.random() * 50,
          uptime: 99.8 + Math.random() * 0.2
        };

      case 'environmental':
        return {
          energyGeneration: 15 + Math.random() * 25,
          powerConsumption: 8 + Math.random() * 12,
          networkRequests: 200 + Math.random() * 400,
          temperature: 10 + Math.random() * 25,
          humidity: 20 + Math.random() * 60,
          responseTime: 100 + Math.random() * 200,
          uptime: 99.0 + Math.random() * 1.0
        };

      case 'wifi_hotspot':
        return {
          energyGeneration: 8 + Math.random() * 15,
          powerConsumption: 20 + Math.random() * 30,
          networkRequests: 2000 + Math.random() * 3000,
          temperature: 18 + Math.random() * 22,
          humidity: 35 + Math.random() * 35,
          responseTime: 10 + Math.random() * 40,
          uptime: 99.9 + Math.random() * 0.1
        };

      case 'energy_node':
        return {
          energyGeneration: 50 + Math.random() * 100,
          powerConsumption: 10 + Math.random() * 20,
          networkRequests: 300 + Math.random() * 500,
          temperature: 25 + Math.random() * 20,
          humidity: 25 + Math.random() * 35,
          responseTime: 75 + Math.random() * 125,
          uptime: 98.5 + Math.random() * 1.5
        };

      default:
        return {
          energyGeneration: 10 + Math.random() * 20,
          powerConsumption: 10 + Math.random() * 20,
          networkRequests: 500 + Math.random() * 1000,
          temperature: 20 + Math.random() * 20,
          humidity: 30 + Math.random() * 40,
          responseTime: 50 + Math.random() * 100,
          uptime: 99.0 + Math.random() * 1.0
        };
    }
  }

  private async ensureNodesExist(): Promise<void> {
    if (this.config.verbose) {
      console.log(chalk.blue('Ensuring nodes exist in database...'));
    }

    for (const node of this.nodes) {
      try {
        const { error } = await this.supabase
          .from('nodes')
          .upsert({
            id: node.id,
            name: node.name,
            node_type: node.type,
            status: 'online',
            city_id: node.location.city.toLowerCase().replace(' ', '-'),
            partner_id: node.partner.toLowerCase().replace(' ', '-'),
            location: `POINT(${node.location.longitude} ${node.location.latitude})`,
            metadata: {
              address: `${Math.floor(Math.random() * 9999)} ${['Main', 'Oak', 'Pine', 'Elm', 'Maple'][Math.floor(Math.random() * 5)]} St`,
              installation_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
              model_version: 'v2.1'
            }
          }, {
            onConflict: 'id'
          });

        if (error && this.config.verbose) {
          console.log(chalk.yellow(`Warning: Failed to upsert node ${node.id}: ${error.message}`));
        }
      } catch (error) {
        console.log(chalk.red(`Error upserting node ${node.id}: ${error}`));
      }
    }
  }

  private calculateTimeFactor(): number {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    // Daily pattern: lower activity at night, higher during day
    let dailyFactor = 1.0;
    if (hour >= 22 || hour <= 6) {
      dailyFactor = 0.3 + Math.random() * 0.2; // Night time
    } else if (hour >= 7 && hour <= 9) {
      dailyFactor = 1.2 + Math.random() * 0.3; // Morning rush
    } else if (hour >= 17 && hour <= 19) {
      dailyFactor = 1.3 + Math.random() * 0.4; // Evening rush
    } else {
      dailyFactor = 0.8 + Math.random() * 0.4; // Day time
    }

    // Weekly pattern: lower on weekends
    let weeklyFactor = 1.0;
    if (day === 0 || day === 6) {
      weeklyFactor = 0.6 + Math.random() * 0.2;
    }

    return dailyFactor * weeklyFactor;
  }

  private generateTelemetryData(node: NodeConfig): any[] {
    const now = new Date().toISOString();
    const timeFactor = this.calculateTimeFactor();
    const telemetryData = [];

    // Energy generation with solar/day cycle consideration
    const energyGen = node.baselineMetrics.energyGeneration * timeFactor *
                     (1 + (Math.random() - 0.5) * this.config.noiseLevel);
    telemetryData.push({
      node_id: node.id,
      metric_name: 'energy_generated',
      value: Math.max(0, energyGen),
      unit: 'kWh',
      timestamp: now
    });

    // Power consumption
    const powerConsumption = node.baselineMetrics.powerConsumption * timeFactor *
                           (1 + (Math.random() - 0.5) * this.config.noiseLevel);
    telemetryData.push({
      node_id: node.id,
      metric_name: 'power_consumption',
      value: Math.max(0, powerConsumption),
      unit: 'W',
      timestamp: now
    });

    // Network requests
    const networkRequests = node.baselineMetrics.networkRequests * timeFactor *
                          (1 + (Math.random() - 0.5) * this.config.noiseLevel);
    telemetryData.push({
      node_id: node.id,
      metric_name: 'network_requests',
      value: Math.max(0, Math.floor(networkRequests)),
      unit: 'requests',
      timestamp: now
    });

    // Temperature (with daily variation)
    const hour = new Date().getHours();
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 5; // Peak at 2pm
    const temperature = node.baselineMetrics.temperature + tempVariation +
                       (Math.random() - 0.5) * this.config.noiseLevel * 5;
    telemetryData.push({
      node_id: node.id,
      metric_name: 'temperature',
      value: temperature,
      unit: '°C',
      timestamp: now
    });

    // Humidity
    const humidity = node.baselineMetrics.humidity *
                   (1 + (Math.random() - 0.5) * this.config.noiseLevel);
    telemetryData.push({
      node_id: node.id,
      metric_name: 'humidity',
      value: Math.max(0, Math.min(100, humidity)),
      unit: '%',
      timestamp: now
    });

    // Response time (can be affected by load)
    const loadFactor = networkRequests / node.baselineMetrics.networkRequests;
    const responseTime = node.baselineMetrics.responseTime * loadFactor *
                       (1 + (Math.random() - 0.5) * this.config.noiseLevel);
    telemetryData.push({
      node_id: node.id,
      metric_name: 'response_time',
      value: Math.max(1, responseTime),
      unit: 'ms',
      timestamp: now
    });

    // Connectivity status
    const isOnline = Math.random() > (this.config.errorRate / 100);
    telemetryData.push({
      node_id: node.id,
      metric_name: 'connectivity_status',
      value: isOnline ? 1 : 0,
      unit: 'boolean',
      timestamp: now
    });

    // CO2 saved (calculated from energy generation)
    const co2Saved = energyGen * 0.4; // Rough calculation: 0.4kg CO2 per kWh
    telemetryData.push({
      node_id: node.id,
      metric_name: 'co2_saved',
      value: Math.max(0, co2Saved),
      unit: 'kg',
      timestamp: now
    });

    // Random alert generation
    if (Math.random() < 0.01) { // 1% chance of alert
      const alertTypes = ['high_temperature', 'low_power', 'connectivity_issue', 'maintenance_required'];
      const severity = Math.random() < 0.7 ? 'warning' : 'critical';

      telemetryData.push({
        node_id: node.id,
        metric_name: 'alert',
        value: 1,
        unit: 'alert',
        timestamp: now,
        metadata: {
          alert_type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          severity,
          message: `Simulated ${severity} alert for ${node.name}`
        }
      });
    }

    return telemetryData;
  }

  private async sendTelemetryData(): Promise<void> {
    const telemetryData: any[] = [];

    for (const node of this.nodes) {
      const nodeTelemetry = this.generateTelemetryData(node);
      telemetryData.push(...nodeTelemetry);
    }

    try {
      const { error } = await this.supabase
        .from('node_telemetry')
        .insert(telemetryData);

      if (error) {
        console.error(chalk.red(`Error sending telemetry: ${error.message}`));
        return;
      }

      this.metricsSent += telemetryData.length;

      if (this.config.verbose) {
        console.log(chalk.green(`Sent ${telemetryData.length} telemetry points`));
      }
    } catch (error) {
      console.error(chalk.red(`Error sending telemetry: ${error}`));
    }
  }

  private async updateDailyMetrics(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    for (const node of this.nodes) {
      try {
        // Calculate daily aggregates (this would normally be done by database triggers)
        const { data: telemetry } = await this.supabase
          .from('node_telemetry')
          .select('value, metric_name')
          .eq('node_id', node.id)
          .gte('timestamp', new Date(today).toISOString())
          .gte('timestamp', new Date(today + 'T23:59:59').toISOString());

        if (telemetry && telemetry.length > 0) {
          const aggregates = telemetry.reduce((acc, point) => {
            if (!acc[point.metric_name]) {
              acc[point.metric_name] = { sum: 0, count: 0, max: 0, min: Infinity };
            }
            acc[point.metric_name].sum += point.value;
            acc[point.metric_name].count += 1;
            acc[point.metric_name].max = Math.max(acc[point.metric_name].max, point.value);
            acc[point.metric_name].min = Math.min(acc[point.metric_name].min, point.value);
            return acc;
          }, {} as Record<string, any>);

          const dailyMetrics = {
            node_id: node.id,
            date: today,
            total_energy_generated: aggregates.energy_generated?.sum || 0,
            total_power_consumption: aggregates.power_consumption?.sum || 0,
            total_requests: aggregates.network_requests?.sum || 0,
            avg_response_time: aggregates.response_time?.sum / aggregates.response_time?.count || 0,
            uptime_percentage: (aggregates.connectivity_status?.sum / aggregates.connectivity_status?.count || 0) * 100,
            max_temperature: aggregates.temperature?.max || 0,
            min_temperature: aggregates.temperature?.min || 0,
            avg_humidity: aggregates.humidity?.sum / aggregates.humidity?.count || 0
          };

          await this.supabase
            .from('node_metrics_daily')
            .upsert(dailyMetrics, {
              onConflict: 'node_id,date'
            });
        }
      } catch (error) {
        if (this.config.verbose) {
          console.log(chalk.yellow(`Warning: Failed to update daily metrics for ${node.id}: ${error}`));
        }
      }
    }
  }

  private async updateNodeStatus(): Promise<void> {
    const updates = this.nodes.map(node => ({
      id: node.id,
      status: Math.random() > (this.config.errorRate / 100) ? 'online' : 'offline',
      last_seen: new Date().toISOString()
    }));

    try {
      const { error } = await this.supabase
        .from('nodes')
        .upsert(updates, {
          onConflict: 'id'
        });

      if (error && this.config.verbose) {
        console.log(chalk.yellow(`Warning: Failed to update node status: ${error.message}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error updating node status: ${error}`));
    }
  }

  private printStats(): void {
    const elapsed = (Date.now() - this.startTime) / 1000;
    const rate = this.metricsSent / elapsed;

    console.log(chalk.blue('=== Simulator Stats ==='));
    console.log(chalk.blue(`Nodes: ${this.nodes.length}`));
    console.log(chalk.blue(`Runtime: ${elapsed.toFixed(1)}s`));
    console.log(chalk.blue(`Metrics Sent: ${this.metricsSent}`));
    console.log(chalk.blue(`Rate: ${rate.toFixed(1)} metrics/sec`));
    console.log(chalk.blue(`========================'));
  }

  public async start(): Promise<void> {
    console.log(chalk.green('🚀 Starting Telemetry Simulator...'));

    this.startTime = Date.now();
    this.isRunning = true;

    // Ensure nodes exist in database
    await this.ensureNodesExist();

    // Update initial node status
    await this.updateNodeStatus();

    const interval = this.config.intervalSeconds * 1000;
    const endTime = Date.now() + (this.config.durationMinutes * 60 * 1000);
    let lastDailyUpdate = 0;

    console.log(chalk.green('Simulator started with ' + this.nodes.length + ' nodes'));
    console.log(chalk.green('Sending data every ' + this.config.intervalSeconds + ' seconds'));
    console.log(chalk.green('Duration: ' + this.config.durationMinutes + ' minutes'));

    if (this.config.enableRealtime) {
      console.log(chalk.green('Real-time subscriptions enabled'));
    }

    while (this.isRunning && Date.now() < endTime) {
      try {
        await this.sendTelemetryData();

        // Update node status every 5 intervals
        if (Date.now() - lastDailyUpdate > 5 * interval) {
          await this.updateNodeStatus();
          lastDailyUpdate = Date.now();
        }

        // Update daily metrics every hour
        if (Date.now() - lastDailyUpdate > 60 * 60 * 1000) {
          await this.updateDailyMetrics();
          lastDailyUpdate = Date.now();
        }

        await new Promise(resolve => setTimeout(resolve, interval));
      } catch (error) {
        console.error(chalk.red('Error in simulation loop: ' + error));
      }
    }

    this.stop();
  }

  public stop(): void {
    this.isRunning = false;
    console.log(chalk.yellow('🛑 Simulator stopped'));
    this.printStats();
  }
}

// Command line interface
program
  .name('telemetry-simulator')
  .description('Simulate telemetry data for smart city nodes')
  .version('1.0.0');

program
  .option('--url <url>', 'Supabase URL', process.env.NEXT_PUBLIC_SUPABASE_URL!)
  .option('--key <key>', 'Supabase service role key', process.env.SUPABASE_SERVICE_ROLE_KEY!)
  .option('--nodes <count>', 'Number of nodes to simulate', '50')
  .option('--interval <seconds>', 'Data generation interval', '5')
  .option('--duration <minutes>', 'Simulation duration in minutes', '60')
  .option('--noise <level>', 'Noise level (0-1)', '0.2')
  .option('--errors <rate>', 'Error rate percentage (0-100)', '2')
  .option('--realtime', 'Enable real-time subscriptions', false)
  .option('--verbose', 'Enable verbose logging', false)
  .action(async (options) => {
    const config: SimulatorConfig = {
      supabaseUrl: options.url,
      supabaseServiceKey: options.key,
      nodeCount: parseInt(options.nodes),
      intervalSeconds: parseInt(options.interval),
      durationMinutes: parseInt(options.duration),
      noiseLevel: parseFloat(options.noise),
      errorRate: parseFloat(options.errors),
      enableRealtime: options.realtime,
      verbose: options.verbose,
      regions: ['US-West', 'US-East', 'US-Central']
    };

    // Validate configuration
    if (!config.supabaseUrl || !config.supabaseServiceKey) {
      console.error(chalk.red('Error: Supabase URL and service key are required'));
      console.error(chalk.red('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables'));
      process.exit(1);
    }

    if (config.nodeCount <= 0 || config.nodeCount > 1000) {
      console.error(chalk.red('Error: Node count must be between 1 and 1000'));
      process.exit(1);
    }

    if (config.intervalSeconds < 1 || config.intervalSeconds > 300) {
      console.error(chalk.red('Error: Interval must be between 1 and 300 seconds'));
      process.exit(1);
    }

    // Start simulator
    const simulator = new TelemetrySimulator(config);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log(chalk.yellow('\n🛑 Received SIGINT, shutting down gracefully...'));
      simulator.stop();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log(chalk.yellow('\n🛑 Received SIGTERM, shutting down gracefully...'));
      simulator.stop();
      process.exit(0);
    });

    await simulator.start();
  });

// Parse command line arguments
program.parse();

// Export for use in other scripts
export { TelemetrySimulator, type SimulatorConfig, type NodeConfig };