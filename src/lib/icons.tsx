import { Wind, Activity, Sparkles, AirVent, Thermometer, Bandage, Eye, Moon, Users, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const categoryIcons: { [key: string]: LucideIcon } = {
  'cold-flu-remedies': Wind,
  'digestive-health-remedies': Activity,
  'skin-hair-remedies': Sparkles,
  'respiratory-throat-remedies': AirVent,
  'fever-infections-remedies': Thermometer,
  'pain-inflammation-remedies': Bandage,
  'eye-vision-remedies': Eye,
  'stress-sleep-remedies': Moon,
  'womens-health-remedies': Users,
  'immunity-miscellaneous-remedies': Shield,
};
