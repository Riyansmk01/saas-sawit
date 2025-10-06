'use client';

import { useState } from 'react';
import CustomCursor from '@/components/animations/CustomCursor';
import LogoLoop from '@/components/animations/LogoLoop';
import MagnetButton from '@/components/animations/MagnetButton';
import ElectricBorder from '@/components/animations/ElectricBorder';
import ScrollVelocityText from '@/components/animations/ScrollVelocityText';
import RotatingText from '@/components/animations/RotatingText';
import AnimatedThreads from '@/components/animations/AnimatedThreads';
// Removed framer-motion import

export default function AnimationsPage() {
  const [activeDemo, setActiveDemo] = useState('cursor');

  const demos = [
    { id: 'cursor', name: 'Custom Cursor', component: 'CustomCursor' },
    { id: 'logo', name: 'Logo Loop', component: 'LogoLoop' },
    { id: 'magnet', name: 'Magnet Button', component: 'MagnetButton' },
    { id: 'electric', name: 'Electric Border', component: 'ElectricBorder' },
    { id: 'scroll', name: 'Scroll Velocity', component: 'ScrollVelocityText' },
    { id: 'rotate', name: 'Rotating Text', component: 'RotatingText' },
    { id: 'threads', name: 'Animated Threads', component: 'AnimatedThreads' },
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'cursor':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Custom Cursor Demo</h2>
              <p className="text-gray-600 mb-8">Move your mouse around to see the custom cursor effect</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Interactive Elements</h3>
                <div className="space-y-4">
                  <button className="btn-primary w-full">Hover me!</button>
                  <a href="#" className="block text-blue-500 hover:text-blue-700">Link example</a>
                  <input type="text" placeholder="Input field" className="input-field w-full" />
                </div>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Magnetic effect on hover</li>
                  <li>• Trail animation</li>
                  <li>• Click feedback</li>
                  <li>• Smooth transitions</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'logo':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Logo Loop Animation</h2>
              <p className="text-gray-600 mb-8">Infinite scrolling logo with gradient text</p>
            </div>
            
            <div className="space-y-8">
              <LogoLoop text="SAWIT HARVEST" className="bg-gray-100 py-8" />
              <LogoLoop text="PREMIUM QUALITY" className="bg-gray-100 py-8" speed={15} />
              <LogoLoop text="INNOVATION" className="bg-gray-100 py-8" speed={25} />
            </div>
          </div>
        );

      case 'magnet':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Magnet Button Effect</h2>
              <p className="text-gray-600 mb-8">Buttons that follow your mouse cursor</p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="cursor-pointer">
                <MagnetButton strength={0.3}>
                  Standard Magnet
                </MagnetButton>
              </div>
              <div className="cursor-pointer">
                <MagnetButton strength={0.5}>
                  Strong Magnet
                </MagnetButton>
              </div>
              <div className="cursor-pointer">
                <MagnetButton strength={0.8}>
                  Super Magnet
                </MagnetButton>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Mouse following effect</li>
                  <li>• Gradient background</li>
                  <li>• Shimmer animation</li>
                  <li>• Electric border</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Customization</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Adjustable strength</li>
                  <li>• Custom colors</li>
                  <li>• Hover effects</li>
                  <li>• Click animations</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'electric':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Electric Border Animation</h2>
              <p className="text-gray-600 mb-8">Animated borders with electric effects</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ElectricBorder intensity="low" className="p-6">
                <h3 className="text-xl font-semibold mb-2">Low Intensity</h3>
                <p className="text-gray-600">Subtle electric effect</p>
              </ElectricBorder>
              
              <ElectricBorder intensity="medium" className="p-6">
                <h3 className="text-xl font-semibold mb-2">Medium Intensity</h3>
                <p className="text-gray-600">Balanced electric effect</p>
              </ElectricBorder>
              
              <ElectricBorder intensity="high" className="p-6">
                <h3 className="text-xl font-semibold mb-2">High Intensity</h3>
                <p className="text-gray-600">Strong electric effect</p>
              </ElectricBorder>
            </div>
          </div>
        );

      case 'scroll':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Scroll Velocity Text</h2>
              <p className="text-gray-600 mb-8">Text that responds to scroll speed and mouse movement</p>
            </div>
            
            <div className="space-y-8">
              <ScrollVelocityText trigger="scroll" className="text-center">
                <h3 className="text-4xl font-bold">Scroll to see effect</h3>
              </ScrollVelocityText>
              
              <ScrollVelocityText trigger="hover" className="text-center">
                <h3 className="text-4xl font-bold">Hover to see effect</h3>
              </ScrollVelocityText>
              
              <ScrollVelocityText trigger="always" className="text-center">
                <h3 className="text-4xl font-bold">Always animated</h3>
              </ScrollVelocityText>
            </div>
          </div>
        );

      case 'rotate':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Rotating Text Animation</h2>
              <p className="text-gray-600 mb-8">Text that rotates and cycles through different content</p>
            </div>
            
            <div className="space-y-8">
              <div className="text-center">
                <RotatingText 
                  texts={['SAWIT', 'HARVEST', 'PREMIUM', 'QUALITY']}
                  speed={2}
                  className="h-20"
                />
              </div>
              
              <div className="text-center">
                <RotatingText 
                  texts={['INNOVATION', 'TECHNOLOGY', 'EFFICIENCY', 'SUCCESS']}
                  speed={3}
                  axis="x"
                  className="h-20"
                />
              </div>
              
              <div className="text-center">
                <RotatingText 
                  texts={['GROWTH', 'PROFIT', 'SUSTAINABILITY']}
                  speed={1.5}
                  showAll={true}
                  className="h-32"
                />
              </div>
            </div>
          </div>
        );

      case 'threads':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Animated Background Threads</h2>
              <p className="text-gray-600 mb-8">Interactive background with animated threads</p>
            </div>
            
            <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
              <AnimatedThreads 
                threadCount={30}
                speed={1.5}
                interactive={true}
                className="opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Interactive Threads</h3>
                  <p className="text-gray-300">Move your mouse to interact with the threads</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CustomCursor>
      <div className="min-h-screen bg-gray-50">
        {/* Background Threads */}
        <AnimatedThreads 
          threadCount={20}
          speed={0.5}
          interactive={false}
          className="opacity-20"
        />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <h1 className="text-3xl font-bold text-gray-900">Animation Showcase</h1>
              <p className="text-gray-600 mt-2">Interactive animations for Sawit Harvest SaaS</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex space-x-1 overflow-x-auto">
                {demos.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemo(demo.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      activeDemo === demo.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {demo.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div
              key={activeDemo}
              className="transition-all duration-300"
            >
              {renderDemo()}
            </div>
          </div>
        </div>
      </div>
    </CustomCursor>
  );
}
