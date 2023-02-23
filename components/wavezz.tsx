interface WavezzProps {
  className?: string
  variant?: 'primary' | 'secondary'
}
export function Wavezz({ variant = 'primary', ...props }: WavezzProps) {
  if (variant === 'secondary') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        width="100%"
        preserveAspectRatio="none"
        className={props.className}
      >
        <path
          fill-opacity="1"
          d="M0,160L80,144C160,128,320,96,480,106.7C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      width="100%"
      preserveAspectRatio="none"
      className={props.className}
    >
      <path
        fill-opacity="1"
        d="M0,160L20,165.3C40,171,80,181,120,192C160,203,200,213,240,224C280,235,320,245,360,229.3C400,213,440,171,480,165.3C520,160,560,192,600,213.3C640,235,680,245,720,240C760,235,800,213,840,181.3C880,149,920,107,960,101.3C1000,96,1040,128,1080,144C1120,160,1160,160,1200,160C1240,160,1280,160,1320,165.3C1360,171,1400,181,1420,186.7L1440,192L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
      ></path>
    </svg>
  )
}
