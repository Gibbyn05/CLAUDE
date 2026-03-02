import { AbsoluteFill } from 'remotion';
import { COLORS } from '../constants';

type BackgroundVariant = 'dark' | 'dark-teal' | 'dark-purple' | 'dark-shift';

interface BackgroundProps {
  variant?: BackgroundVariant;
}

const GRADIENTS: Record<BackgroundVariant, string> = {
  dark: [
    `radial-gradient(ellipse at 20% 20%, rgba(0,229,200,0.09) 0%, transparent 55%)`,
    `radial-gradient(ellipse at 80% 80%, rgba(167,139,250,0.09) 0%, transparent 55%)`,
    COLORS.bg,
  ].join(', '),

  'dark-teal': [
    `radial-gradient(ellipse at 30% 30%, rgba(0,229,200,0.16) 0%, transparent 60%)`,
    `radial-gradient(ellipse at 75% 72%, rgba(167,139,250,0.07) 0%, transparent 50%)`,
    COLORS.bg,
  ].join(', '),

  'dark-purple': [
    `radial-gradient(ellipse at 68% 22%, rgba(167,139,250,0.16) 0%, transparent 58%)`,
    `radial-gradient(ellipse at 28% 78%, rgba(0,229,200,0.07) 0%, transparent 50%)`,
    COLORS.bg,
  ].join(', '),

  'dark-shift': [
    `radial-gradient(ellipse at 50% 38%, rgba(0,229,200,0.13) 0%, transparent 65%)`,
    `radial-gradient(ellipse at 50% 62%, rgba(167,139,250,0.13) 0%, transparent 65%)`,
    COLORS.bg,
  ].join(', '),
};

export const Background: React.FC<BackgroundProps> = ({ variant = 'dark' }) => (
  <AbsoluteFill style={{ background: GRADIENTS[variant] }} />
);
