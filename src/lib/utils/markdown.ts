/**
 * Converts markdown content to HTML for use in TipTap editor
 * Also detects if content is already HTML
 */

export function isHTML(content: string): boolean {
  // Check if content contains HTML tags
  return /<[a-z][\s\S]*>/i.test(content)
}

export function markdownToHTML(content: string): string {
  if (!content) return ''

  // If already HTML, return as-is
  if (isHTML(content)) return content

  // Convert markdown to HTML
  let html = content

  // Escape HTML entities first (except for our conversions)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Convert headings (must be at start of line)
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Convert bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // Process blocks (split by double newlines)
  const blocks = html.split(/\n\n+/)
  const processedBlocks = blocks.map(block => {
    const trimmed = block.trim()

    // Skip if already wrapped in block-level tags
    if (/^<(h[1-6]|ul|ol|blockquote|p)/.test(trimmed)) {
      return trimmed
    }

    // Convert unordered lists
    if (/^- /.test(trimmed)) {
      const items = trimmed.split('\n')
        .filter(line => line.trim().startsWith('- '))
        .map(line => `<li>${line.replace(/^- /, '')}</li>`)
        .join('')
      return `<ul>${items}</ul>`
    }

    // Convert ordered lists
    if (/^\d+\. /.test(trimmed)) {
      const items = trimmed.split('\n')
        .filter(line => /^\d+\. /.test(line.trim()))
        .map(line => `<li>${line.replace(/^\d+\. /, '')}</li>`)
        .join('')
      return `<ol>${items}</ol>`
    }

    // Wrap regular paragraphs
    if (trimmed && !trimmed.startsWith('<')) {
      // Handle single line breaks within paragraphs
      const withBreaks = trimmed.replace(/\n/g, '<br>')
      return `<p>${withBreaks}</p>`
    }

    return trimmed
  })

  return processedBlocks.filter(Boolean).join('')
}

/**
 * Converts HTML content to markdown for storage or display
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return ''

  let md = html

  // Convert headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')

  // Convert bold and italic
  md = md.replace(/<strong><em>(.*?)<\/em><\/strong>/gi, '***$1***')
  md = md.replace(/<em><strong>(.*?)<\/strong><\/em>/gi, '***$1***')
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')

  // Convert links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')

  // Convert inline code
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')

  // Convert blockquotes
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')

  // Convert lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n') + '\n'
  })
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let i = 1
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m: string, txt: string) => `${i++}. ${txt}\n`) + '\n'
  })

  // Convert paragraphs and breaks
  md = md.replace(/<br\s*\/?>/gi, '\n')
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '')

  // Decode HTML entities
  md = md.replace(/&amp;/g, '&')
  md = md.replace(/&lt;/g, '<')
  md = md.replace(/&gt;/g, '>')
  md = md.replace(/&nbsp;/g, ' ')

  // Clean up extra whitespace
  md = md.replace(/\n{3,}/g, '\n\n').trim()

  return md
}

/**
 * Renders content for public display, handling both HTML and markdown
 */
export function renderContent(content: string): string {
  if (!content) return ''

  // If content is already HTML, return it (with some cleanup)
  if (isHTML(content)) {
    return content
  }

  // Convert markdown to styled HTML for display
  let html = content

  // Convert headings
  html = html.replace(/^#### (.+)$/gm, '<h4 class="mt-6 mb-3 text-lg font-semibold text-brand-black">$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3 class="mt-6 mb-3 text-xl font-semibold text-brand-black">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="mt-8 mb-4 text-2xl font-bold text-brand-black">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="mt-8 mb-4 text-3xl font-bold text-brand-black">$1</h1>')

  // Convert bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-brand-black">$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-green-600 underline hover:text-brand-green-700">$1</a>')

  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="pl-4 border-l-4 border-brand-green-300 italic text-muted-foreground my-4">$1</blockquote>')

  // Process blocks
  const blocks = html.split(/\n\n+/)
  const processedBlocks = blocks.map(block => {
    const trimmed = block.trim()

    if (!trimmed) return ''

    // Skip if already has styling classes
    if (/class="/.test(trimmed)) return trimmed

    // Convert unordered lists
    if (/^- /.test(trimmed)) {
      const items = trimmed.split('\n')
        .filter(line => line.trim().startsWith('- '))
        .map(line => `<li class="ml-4">${line.replace(/^- /, '')}</li>`)
        .join('')
      return `<ul class="my-4 space-y-1 list-disc pl-4 text-muted-foreground">${items}</ul>`
    }

    // Convert ordered lists
    if (/^\d+\. /.test(trimmed)) {
      const items = trimmed.split('\n')
        .filter(line => /^\d+\. /.test(line.trim()))
        .map(line => `<li class="ml-4">${line.replace(/^\d+\. /, '')}</li>`)
        .join('')
      return `<ol class="my-4 space-y-1 list-decimal pl-4 text-muted-foreground">${items}</ol>`
    }

    // Wrap paragraphs
    if (!trimmed.startsWith('<')) {
      return `<p class="my-4 leading-relaxed text-muted-foreground">${trimmed}</p>`
    }

    return trimmed
  })

  return processedBlocks.filter(Boolean).join('')
}
