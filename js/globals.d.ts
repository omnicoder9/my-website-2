interface NavigatorConnectionLike {
  effectiveType?: string;
  type?: string;
}

interface Navigator {
  connection?: NavigatorConnectionLike;
}

interface Window {
  webkitAudioContext?: typeof AudioContext;
  openPopup?: () => void;
  addCustomCard?: () => void;
  generateUsername?: () => void;
  copyUsername?: () => void;
  generatePassword?: () => void;
  copyPassword?: () => void;
}
