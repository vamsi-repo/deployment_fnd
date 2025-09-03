# Adding Your Images to the User Dashboard

## Current Status
✅ Your User Dashboard has been updated to match the design from your Dashboard.tsx file
✅ The layout, sections, and functionality are identical
✅ Currently using Lucide React icons as placeholders

## How to Add Your Images

### 1. Create the images directory:
```bash
cd frontend/src
mkdir images
```

### 2. Add your image files to the directory:
- `Keansa_Logo.png` - Your company logo
- `data_maping_1.png` - Extract icon
- `data_maping_2.png` - Transform icon  
- `data_maping_3.png` - Load icon
- `mdm_1.png` - Dimensions icon
- `mdm_2.png` - Information icon
- `mdm_3.png` - Cube icon
- `Rule Configurations.png` - Rule Configurations icon
- `Data Validations.png` - Data Validations icon
- `sftp-icon.png` - Connections icon

### 3. Update the UserDashboard.tsx file:

Replace the icon placeholder sections with your images:

```tsx
// Add imports at the top
import keansaLogo from '@/images/Keansa_Logo.png';
import dataMapping1 from '@/images/data_maping_1.png';
import dataMapping2 from '@/images/data_maping_2.png';
import dataMapping3 from '@/images/data_maping_3.png';
import mdm1 from '@/images/mdm_1.png';
import mdm2 from '@/images/mdm_2.png';
import mdm3 from '@/images/mdm_3.png';
import ruleConfigurationsIcon from '@/images/Rule Configurations.png';
import dataValidationsIcon from '@/images/Data Validations.png';
import autodatavalidationicon from '../images/sftp-icon.png';

// Replace logo placeholder
<img
  src={keansaLogo}
  alt="Keansa Logo"
  className="absolute top-6 right-8 w-20 h-20 z-20"
  style={{ objectFit: 'contain' }}
/>

// Replace Extract card
<img src={dataMapping1} alt="Extract" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Transform card  
<img src={dataMapping2} alt="Transform" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Load card
<img src={dataMapping3} alt="Load" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Dimensions card
<img src={mdm1} alt="Dimensions" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Information card
<img src={mdm2} alt="Information" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Cube card
<img src={mdm3} alt="Cube" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Rule Configurations card
<img src={ruleConfigurationsIcon} alt="Rule Configurations" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Data Validations card
<img src={dataValidationsIcon} alt="Data Validations" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />

// Replace Connections card
<img src={autodatavalidationicon} alt="Connections" className="w-12 h-12 rounded-none mb-2" style={{ objectFit: 'cover' }} />
```

### 4. Alternative: Keep using icons
If you prefer to use the current icon-based design, no further changes are needed. The icons are colorful and professional.

## What's Already Working

✅ **Layout**: Identical to your original Dashboard.tsx
✅ **Sections**: Data Mapping, Master Data Management, Error Correction & Detection
✅ **Navigation**: Sidebar with proper user info and logout
✅ **Functionality**: Card clicks, ConnectionsDialog, section scrolling
✅ **Styling**: Same card sizes, hover effects, and grid layout
✅ **User Context**: Integrated with your auth system

## Test Your Dashboard

1. Start your development servers:
```bash
# Backend
cd backend && python app.py

# Frontend
cd frontend && npm run dev
```

2. Login as a regular user (not admin)
3. You should see the new dashboard design with Data Sync AI layout

The dashboard will work identically to your original, just with icon placeholders until you add your actual images!