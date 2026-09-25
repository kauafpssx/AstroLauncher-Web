type SectionHeadingProps = {
  title: string
  description?: string
}
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14">
      <h2 className="glow-text font-serif text-[2.5rem] leading-tight font-semibold md:text-[3.2rem]">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 max-w-[800px] text-[1.15rem]">
          {description}
        </p>
      )}
    </div>
  )
}
