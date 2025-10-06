# 🎨 Animations Documentation

Dokumentasi lengkap untuk semua komponen animasi yang tersedia di Sawit Harvest SaaS.

## 📋 Daftar Animasi

### 1. 🖱️ Custom Cursor
**File:** `components/animations/CustomCursor.tsx`

Animasi cursor custom yang menggantikan cursor default browser.

**Fitur:**
- Magnetic effect saat hover
- Trail animation dengan partikel
- Click feedback
- Smooth transitions

**Penggunaan:**
```tsx
import { CustomCursor } from '@/components/animations';

<CustomCursor>
  <div>Konten Anda di sini</div>
</CustomCursor>
```

### 2. 🔄 Logo Loop Animation
**File:** `components/animations/LogoLoop.tsx`

Animasi teks yang berputar secara horizontal dengan gradient.

**Fitur:**
- Infinite scrolling
- Gradient text animation
- Customizable speed
- Multiple variants

**Penggunaan:**
```tsx
import { LogoLoop } from '@/components/animations';

<LogoLoop 
  text="SAWIT HARVEST" 
  speed={20} 
  className="text-white"
/>
```

### 3. 🧲 Magnet Button
**File:** `components/animations/MagnetButton.tsx`

Button yang mengikuti cursor saat hover dengan efek magnet.

**Fitur:**
- Mouse following effect
- Gradient background
- Shimmer animation
- Electric border
- Adjustable strength

**Penggunaan:**
```tsx
import { MagnetButton } from '@/components/animations';

<MagnetButton 
  strength={0.3}
  onClick={() => console.log('Clicked!')}
>
  Click Me!
</MagnetButton>
```

### 4. ⚡ Electric Border
**File:** `components/animations/ElectricBorder.tsx`

Border dengan efek listrik yang bergerak.

**Fitur:**
- Animated borders
- Intensity levels (low, medium, high)
- Hover effects
- Electric sparks
- Custom colors

**Penggunaan:**
```tsx
import { ElectricBorder } from '@/components/animations';

<ElectricBorder 
  intensity="medium"
  color="#10B981"
  className="p-6"
>
  <h3>Content with electric border</h3>
</ElectricBorder>
```

### 5. 📜 Scroll Velocity Text
**File:** `components/animations/ScrollVelocityText.tsx`

Text yang bereaksi terhadap kecepatan scroll atau mouse movement.

**Fitur:**
- Scroll responsive
- Mouse interaction
- Velocity indicators
- Trail effects
- Multiple triggers

**Penggunaan:**
```tsx
import { ScrollVelocityText } from '@/components/animations';

<ScrollVelocityText 
  trigger="scroll"
  speed={1}
  direction="up"
>
  <h2>Scroll to see effect</h2>
</ScrollVelocityText>
```

### 6. 🔄 Rotating Text
**File:** `components/animations/RotatingText.tsx`

Text yang berotasi dan berganti-ganti konten.

**Fitur:**
- 3D rotation
- Text cycling
- Carousel mode
- Progress indicators
- Customizable timing

**Penggunaan:**
```tsx
import { RotatingText } from '@/components/animations';

<RotatingText 
  texts={['Text 1', 'Text 2', 'Text 3']}
  speed={2}
  axis="y"
/>
```

### 7. 🧵 Animated Background Threads
**File:** `components/animations/AnimatedThreads.tsx`

Background dengan thread yang bergerak dan interaktif.

**Fitur:**
- Interactive threads
- Canvas animation
- Connection effects
- Multiple variants
- Performance optimized

**Penggunaan:**
```tsx
import { AnimatedThreads } from '@/components/animations';

<AnimatedThreads 
  threadCount={30}
  speed={1.5}
  interactive={true}
  className="opacity-60"
/>
```

## 🎯 Variants dan Alternatif

Setiap komponen memiliki beberapa variants:

### Logo Loop
- `LogoLoop` - Versi utama
- `SimpleLogoLoop` - Versi sederhana

### Magnet Button
- `MagnetButton` - Versi utama
- `CSSMagnetButton` - Versi CSS-only

### Electric Border
- `ElectricBorder` - Versi utama
- `CSSElectricBorder` - Versi CSS-only

### Scroll Velocity Text
- `ScrollVelocityText` - Versi utama
- `CSSScrollVelocityText` - Versi CSS-only

### Rotating Text
- `RotatingText` - Versi utama
- `RotatingTextCarousel` - Versi carousel 3D
- `CSSRotatingText` - Versi CSS-only

### Animated Threads
- `AnimatedThreads` - Versi utama (Canvas)
- `SVGAnimatedThreads` - Versi SVG
- `CSSAnimatedThreads` - Versi CSS-only

## 🎨 CSS Animations

Semua animasi menggunakan CSS keyframes yang didefinisikan di `app/globals.css`:

- `@keyframes scroll` - Untuk logo loop
- `@keyframes gradient-x` - Untuk gradient animation
- `@keyframes electric-flow` - Untuk electric border
- `@keyframes float` - Untuk floating animation
- `@keyframes glow` - Untuk glow effect
- `@keyframes pulse-glow` - Untuk pulse glow
- `@keyframes rotate-text` - Untuk rotating text
- `@keyframes thread-move` - Untuk thread movement
- `@keyframes shimmer` - Untuk shimmer effect
- `@keyframes electric-border` - Untuk electric border animation

## 🚀 Performance Tips

1. **Gunakan CSS-only variants** untuk performa terbaik
2. **Batasi thread count** untuk AnimatedThreads
3. **Gunakan `prefers-reduced-motion`** untuk accessibility
4. **Optimize canvas size** untuk AnimatedThreads

## 📱 Responsive Design

Semua animasi sudah responsive dan akan menyesuaikan dengan ukuran layar:

- Mobile: Animasi disederhanakan
- Tablet: Animasi medium
- Desktop: Animasi penuh

## ♿ Accessibility

- Support untuk `prefers-reduced-motion`
- Keyboard navigation
- Screen reader friendly
- High contrast support

## 🔧 Customization

Setiap komponen dapat dikustomisasi melalui props:

- **Colors**: Custom color schemes
- **Speed**: Animation speed control
- **Intensity**: Effect intensity levels
- **Size**: Component sizing
- **Direction**: Animation direction

## 📖 Contoh Penggunaan Lengkap

Lihat halaman demo di `/animations` untuk contoh penggunaan lengkap semua animasi.

## 🐛 Troubleshooting

### Animasi tidak berjalan
1. Pastikan CSS animations sudah di-import
2. Check browser support untuk CSS animations
3. Pastikan tidak ada conflict dengan CSS lain

### Performance issues
1. Kurangi thread count untuk AnimatedThreads
2. Gunakan CSS-only variants
3. Disable animasi pada mobile jika perlu

### Build errors
1. Pastikan semua dependencies terinstall
2. Check TypeScript types
3. Pastikan import paths benar