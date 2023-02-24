import { useSpring, animated, easings, config } from '@react-spring/web'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

interface WavezzProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
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
        aria-hidden
      >
        <path
          fillOpacity="1"
          d="M0,160L80,144C160,128,320,96,480,106.7C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    )
  }

  if (variant === 'tertiary') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        width="100%"
        preserveAspectRatio="none"
        className={props.className}
        aria-hidden
      >
        <path
          fillOpacity="1"
          d="M0,64L21.8,58.7C43.6,53,87,43,131,64C174.5,85,218,139,262,138.7C305.5,139,349,85,393,96C436.4,107,480,181,524,192C567.3,203,611,149,655,122.7C698.2,96,742,96,785,106.7C829.1,117,873,139,916,149.3C960,160,1004,160,1047,144C1090.9,128,1135,96,1178,106.7C1221.8,117,1265,171,1309,170.7C1352.7,171,1396,117,1418,90.7L1440,64L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
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
      aria-hidden
    >
      <path
        fillOpacity="1"
        d="M0,160L20,165.3C40,171,80,181,120,192C160,203,200,213,240,224C280,235,320,245,360,229.3C400,213,440,171,480,165.3C520,160,560,192,600,213.3C640,235,680,245,720,240C760,235,800,213,840,181.3C880,149,920,107,960,101.3C1000,96,1040,128,1080,144C1120,160,1160,160,1200,160C1240,160,1280,160,1320,165.3C1360,171,1400,181,1420,186.7L1440,192L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
      ></path>
    </svg>
  )
}

const layeredWavezz: {
  1: string
  2: string
  3: string
}[] = [
  {
    1: 'M0 0.299805C51.7 5.4998 103.4 10.6998 136.6 39.5998C169.8 68.4998 184.5 121.1 229.8 143.7C275.1 166.2 351 158.8 371.9 189.8C392.8 220.8 358.8 290.2 364.3 341.6C369.7 393.1 414.7 426.5 459.7 460H0V0.299805Z',
    2: 'M0 153.5C34.5 157 68.9 160.5 91.1 179.8C113.2 199 123 234.1 153.2 249.1C183.4 264.2 234 259.2 247.9 279.9C261.9 300.5 239.2 346.8 242.8 381.1C246.5 415.4 276.5 437.7 306.5 460H0V153.5Z',
    3: 'M0 306.8C17.2 308.5 34.5 310.2 45.5 319.9C56.6 329.5 61.5 347 76.6 354.6C91.7 362.1 117 359.6 124 369.9C130.9 380.3 119.6 403.4 121.4 420.5C123.2 437.7 138.2 448.8 153.2 460H0V306.8Z',
  },
  {
    1: 'M0 0.299805C38.5 33.9998 77 67.6998 124.5 76.6998C172.1 85.7998 228.8 70.2998 270.2 88.0998C311.6 105.9 337.9 157.1 352.7 203.7C367.6 250.3 371.1 292.3 387.1 334.2C403 376.2 431.4 418.1 459.7 460H0V0.299805Z',
    2: 'M0 153.5C25.7 176 51.3 198.4 83 204.5C114.7 210.5 152.5 200.2 180.1 212.1C207.8 223.9 225.2 258.1 235.2 289.2C245.1 320.2 247.4 348.2 258.1 376.2C268.7 404.1 287.6 432.1 306.5 460H0V153.5Z',
    3: 'M0 306.8C12.8 318 25.7 329.2 41.5 332.2C57.4 335.3 76.3 330.1 90.1 336C103.9 342 112.6 359 117.6 374.6C122.5 390.1 123.7 404.1 129 418.1C134.3 432.1 143.8 446 153.2 460H0V306.8Z',
  },
  {
    1: 'M0 0.299805C41 22.5998 82.1 44.8998 132 53.8998C181.8 62.8998 240.5 58.6998 270.2 88.0998C300 117.5 300.8 180.6 327.7 221.9C354.5 263.3 407.3 283 433.7 319.1C460 355.1 459.9 407.6 459.7 460H0V0.299805Z',
    2: 'M0 153.5C27.4 168.4 54.7 183.3 88 189.3C121.2 195.3 160.3 192.5 180.1 212.1C200 231.7 200.5 273.7 218.4 301.3C236.3 328.9 271.6 342 289.1 366.1C306.7 390.1 306.6 425 306.5 460H0V153.5Z',
    3: 'M0 306.8C13.7 314.2 27.4 321.6 44 324.6C60.6 327.6 80.2 326.2 90.1 336C100 345.8 100.3 366.9 109.2 380.6C118.2 394.4 135.8 401 144.6 413C153.3 425 153.3 442.5 153.2 460H0V306.8Z',
  },
  {
    1: 'M0 0.299805C36.8 44.1998 73.5 88.1998 114 109.1C154.5 130 198.8 127.8 226.9 147.7C255 167.6 267 209.5 305 238.4C343 267.3 407.1 283.2 437.2 317.9C467.3 352.7 463.5 406.4 459.7 460H0V0.299805Z',
    2: 'M0 153.5C24.5 182.8 49 212.1 76 226C103 240 132.5 238.6 151.3 251.8C170 265.1 178 293 203.3 312.3C228.7 331.5 271.4 342.1 291.5 365.3C311.6 388.5 309 424.2 306.5 460H0V153.5Z',
    3: 'M0 306.8C12.3 321.4 24.5 336.1 38 343C51.5 350 66.3 349.3 75.6 355.9C85 362.5 89 376.5 101.7 386.1C114.3 395.8 135.7 401.1 145.7 412.6C155.8 424.2 154.5 442.1 153.2 460H0V306.8Z',
  },
  {
    1: 'M0 0.299805C32.2 51.5998 64.4 103 114 109.1C163.7 115.2 230.8 75.9998 270.2 88.0998C309.6 100.2 321.4 163.5 345.5 209C369.5 254.6 405.9 282.4 427 321.3C448.1 360.1 453.9 410.1 459.7 460H0V0.299805Z',
    2: 'M0 153.5C21.5 187.8 42.9 222 76 226C109.1 230.1 153.9 204 180.1 212.1C206.4 220.1 214.3 262.3 230.3 292.7C246.3 323 270.6 341.6 284.7 367.5C298.7 393.4 302.6 426.7 306.5 460H0V153.5Z',
    3: 'M0 306.8C10.7 323.9 21.5 341 38 343C54.6 345.1 76.9 332 90.1 336C103.2 340.1 107.1 361.2 115.2 376.3C123.2 391.5 135.3 400.8 142.3 413.8C149.4 426.7 151.3 443.4 153.2 460H0V306.8Z',
  },
]

const animationConfig = {
  config: {
    ...config.molasses,
    duration: 6000,
  },
  loop: { reverse: true },
}

interface LayeredWavezzProps {
  className?: string
  direction?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}
export function LayeredWavezz({
  direction = 'bottom-left',
  ...props
}: LayeredWavezzProps) {
  const [currentI, setCurrentI] = useState(() => {
    switch (direction) {
      case 'bottom-left':
        return 0
      case 'bottom-right':
        return 1
      case 'top-left':
        return 2
      case 'top-right':
      default:
        return 3
    }
  })
  const fromLayeredWavezz = useMemo(() => {
    return layeredWavezz[currentI]
  }, [currentI])

  const toLayeredWavezz = useMemo(() => {
    return layeredWavezz[(currentI + 1) % layeredWavezz.length]
  }, [currentI])

  const { d: pathD1 } = useSpring({
    from: { d: fromLayeredWavezz[1] },
    to: { d: toLayeredWavezz[1] },
    ...animationConfig,
    onRest: () => {
      console.log('Rest')
      setCurrentI(Math.floor(Math.random() * layeredWavezz.length))
    },
  })
  const { d: pathD2 } = useSpring({
    from: { d: fromLayeredWavezz[2] },
    to: { d: toLayeredWavezz[2] },
    ...animationConfig,
  })
  const { d: pathD3 } = useSpring({
    from: { d: fromLayeredWavezz[3] },
    to: { d: toLayeredWavezz[3] },
    ...animationConfig,
  })

  return (
    <svg
      viewBox="0 0 460 464"
      fill="none"
      preserveAspectRatio="none"
      className={clsx(
        direction === 'bottom-left' && '', // default
        direction === 'top-right' && '-scale-y-100 -scale-x-100',
        direction === 'top-left' && '-scale-y-100',
        direction === 'bottom-right' && '-scale-x-100',
        props.className
      )}
      aria-hidden
    >
      <animated.path
        d={pathD1}
        className="fill-[#D6E0FF] dark:fill-[#5977d0]"
      />
      <animated.path
        d={pathD2}
        className="fill-[#76A6FF] dark:fill-[#1f4a9c]"
      />
      <animated.path
        d={pathD3}
        className="fill-[#008BFF] dark:fill-[#0d76cb]"
      />
    </svg>
  )
}
