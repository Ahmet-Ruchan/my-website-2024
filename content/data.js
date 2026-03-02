/**
 * Projects & Research Hub — Content Data
 *
 * All content items are stored as plain JS objects.
 * Tags must not contain commas (used as URL param separator).
 * Items with status:'draft' are excluded from all helper functions.
 */

const CONTENT = [
    {
        slug: 'detecthub',
        type: 'project',
        status: 'published',
        featured: false,
        title: 'DetectHub',
        description: 'Advanced object detection platform built on YOLO and FastAPI, serving real-time inference via REST API with a React dashboard for annotation and model management.',
        date: '2024-03-15',
        tags: ['Python', 'FastAPI', 'React', 'YOLO', 'Computer Vision'],
        coverImage: null,
        projectStatus: 'active',
        techStack: ['Python', 'FastAPI', 'React', 'YOLO', 'Docker'],
        impactMetric: '500+ users',
        repoUrl: 'https://github.com/Ahmet-Ruchan',
        demoUrl: null,
        paperUrl: null,
        gallery: [],
        body: `## Problem

Object detection models are powerful, but deploying them into production remains a friction-heavy process. Researchers typically train models in isolation — a Jupyter notebook here, a script there — with no standard interface for serving predictions or managing model versions. Teams waste days setting up endpoints before they can get a single inference result in front of a user.

## Approach

DetectHub is built around a single FastAPI application that exposes a unified REST inference endpoint. Models are registered via a YAML manifest and loaded lazily on first request. The React dashboard provides an annotation interface where users can upload images, run inference, review detections, and export results in COCO format.

The backend uses a worker-pool pattern: each YOLO model variant runs in a dedicated subprocess, isolated from the API layer. Requests are queued and dispatched via Redis Streams, giving the system backpressure control under heavy load.

\`\`\`python
@app.post("/infer/{model_id}")
async def infer(model_id: str, file: UploadFile):
    image = await read_image(file)
    result = await model_pool.dispatch(model_id, image)
    return DetectionResponse(detections=result.boxes, latency_ms=result.latency)
\`\`\`

## Impact

DetectHub is in active use by 500+ users across academic and commercial settings. Average inference latency is under 80 ms for YOLOv8-nano on GPU. The annotation export pipeline has been used to generate training datasets for three downstream models in the medical imaging domain.`
    },

    {
        slug: 'neural-attention-mechanisms',
        type: 'research',
        status: 'published',
        featured: false,
        title: 'Scalable Neural Attention Mechanisms for Long-Document Understanding',
        description: 'Workshop paper exploring efficient sparse attention patterns for documents exceeding standard context windows, achieving 47% memory reduction with comparable accuracy.',
        date: '2024-12-01',
        tags: ['Attention', 'Transformers', 'NLP', 'Deep Learning', 'Efficiency'],
        coverImage: null,
        venue: 'NeurIPS 2024 Workshop on Efficient NLP',
        doi: '10.xxxx/fake.2024.neurips.attn',
        pdfUrl: null,
        coauthors: ['Dr. Elif Yıldız', 'Prof. Serkan Demir'],
        abstract: `We propose a family of sparse attention mechanisms designed for long-document natural language understanding tasks where context windows routinely exceed 8,000 tokens. Standard full-attention transformers scale quadratically with sequence length, making them impractical for legal, scientific, and clinical document processing at scale. Our approach introduces a hierarchical attention scheme that partitions documents into semantic segments, applies dense local attention within segments, and cross-attends between segment summary representations using a learned routing function. Unlike fixed-window approaches, our routing adapts to document structure — section boundaries detected via shallow syntactic cues serve as natural segment delimiters. Evaluated on the SCROLLS benchmark across five long-document tasks, our method achieves accuracy within 1.2 points of full-attention baselines while reducing peak GPU memory consumption by 47% and inference latency by 31%. We release code, pre-trained checkpoints, and the segment-routing module as a standalone library to facilitate reproducibility and adaptation to new domains.`,
        citations: `@inproceedings{avci2024attention,
  title     = {Scalable Neural Attention Mechanisms for Long-Document Understanding},
  author    = {Avc{\\i}, Ahmet Ru{\\c{c}}han and Y{\\i}ld{\\i}z, Elif and Demir, Serkan},
  booktitle = {NeurIPS 2024 Workshop on Efficient Natural Language Processing},
  year      = {2024},
  doi       = {10.xxxx/fake.2024.neurips.attn},
  url       = {https://arxiv.org/abs/2412.xxxxx}
}`,
        body: `## Introduction

Long-document understanding remains one of the core unsolved challenges in applied NLP. Legal contracts, scientific papers, and clinical notes regularly run to tens of thousands of tokens — far beyond the practical context limits of most deployed transformer models. While context windows have grown substantially in recent years, the quadratic scaling of self-attention means that raw window expansion trades directly against inference cost and throughput.

## Method

Our hierarchical attention scheme operates in two stages. In the first stage, a shallow segment detector identifies document structure — section headers, paragraph breaks, and semantic shifts — and partitions the document into variable-length segments. In the second stage, dense local attention is applied within each segment, and a lightweight cross-segment attention layer attends over learned segment summary vectors.

## Experiments

We evaluate on SCROLLS, a benchmark of six long-document tasks including summarization, question answering, and classification. Our model matches full-attention baselines on four of six tasks and exceeds them on two, while requiring 47% less peak memory.

## Conclusion

Sparse hierarchical attention offers a practical path to long-document understanding without the prohibitive costs of full-context transformers. Future work will explore learned segment routing using document-level supervision signals.`
    },

    {
        slug: 'what-i-learned-about-mcp-at-aws-conference',
        type: 'blog',
        status: 'published',
        featured: false,
        title: 'What I Learned About MCP at the AWS re:Invent Conference',
        description: 'Key takeaways from AWS re:Invent on the Model Context Protocol — tool calling patterns, security considerations, stateful session design, and real-world integration lessons.',
        date: '2024-12-10',
        tags: ['MCP', 'AWS', 'LLM', 'GenAI', 'Architecture'],
        coverImage: null,
        seriesName: 'MCP Development',
        seriesOrder: 1,
        body: `## What Is MCP and Why Does It Matter

The Model Context Protocol (MCP) defines a standard interface between LLM inference systems and the tools they call. Think of it as the HTTP of agent-to-tool communication — a wire format and session contract that lets any model, running anywhere, invoke tools defined by anyone, without the two sides needing to know each other's internals.

Before MCP, every team building agentic applications invented their own tool-calling schema. The result was a fragmented ecosystem: tools written for GPT-4 couldn't be reused with Claude; evaluation harnesses couldn't reason about tool calls across providers; security policies had to be re-implemented for every stack. MCP solves this by standardizing the protocol, not the tools.

At AWS re:Invent, three sessions focused specifically on MCP adoption patterns in enterprise environments. Here's what stood out.

## Tool Calling Patterns in Production

Three architectural patterns dominated the discussion:

### Pattern 1: Stateless Tools

The simplest and most composable pattern. Each tool call is self-contained — no session state, no side effects beyond the returned value. Tools in this category include database lookups, API calls, and computation utilities.

\`\`\`python
@mcp.tool()
def query_inventory(product_id: str) -> dict:
    """Look up current stock levels for a product."""
    with get_db_connection() as conn:
        row = conn.execute(
            "SELECT quantity, warehouse FROM inventory WHERE product_id = ?",
            (product_id,)
        ).fetchone()
    return {"quantity": row["quantity"], "warehouse": row["warehouse"]}
\`\`\`

Stateless tools are easy to test, cache-friendly, and safe to retry. Start here.

### Pattern 2: Stateful Sessions

Some workflows require accumulating context across multiple tool calls — a file editor that remembers open buffers, a code interpreter that maintains variable state between turns. MCP supports this via session objects.

\`\`\`javascript
const session = await mcp.createSession({
    persist: true,
    ttl: 3600 // session lives for 1 hour
});

// First call initializes context
await session.call('init_code_sandbox', { runtime: 'python3.11' });

// Subsequent calls share state
const result = await session.call('execute', {
    code: 'x = [i**2 for i in range(10)]'
});
\`\`\`

The session model adds complexity — you need to handle expiry, cleanup, and failover. Use it only when stateless tools genuinely cannot model the workflow.

### Pattern 3: Tool Composition

Advanced pattern where one tool orchestrates other tools. An "analysis" tool might call a data-retrieval tool, a computation tool, and a formatting tool in sequence, returning a composed result to the model.

## Security Considerations

Tool exposure introduces an attack surface that most teams underestimate. At re:Invent, the security talk covered four key risks:

1. **Prompt injection via tool results** — a malicious document returned by a retrieval tool can instruct the model to call destructive tools. Mitigate by sanitizing tool outputs before they re-enter the context window.
2. **Overly broad tool permissions** — every tool should operate under least-privilege. A customer-lookup tool should not also have write access to the CRM.
3. **Tool schema as a vector** — tool names and descriptions are part of the model's context. Adversarially crafted tool descriptions can bias model behavior.
4. **Unvalidated inputs** — the model constructs tool call arguments; those arguments must be validated server-side, not trusted.

\`\`\`bash
# Use mcp-inspector to validate tool schemas before deployment
mcp-inspector validate \\
  --schema ./tools/schema.json \\
  --strict \\
  --output report.json
\`\`\`

## Key Takeaways

The MCP ecosystem is maturing quickly. A year ago, the protocol was a draft spec with two reference implementations. Today there are dozens of community-built tool servers covering everything from browser automation to SQL query generation.

The most important thing I took away: MCP is infrastructure, not magic. The protocol handles the plumbing — session management, schema validation, error propagation. The hard work is still in designing tools that are useful, safe, and correctly scoped. That hasn't changed just because the wire format is now standardized.`
    },

    {
        slug: 'medai-pipeline',
        type: 'project',
        status: 'published',
        featured: true,
        title: 'MedAI Processing Pipeline',
        description: 'End-to-end medical document intelligence pipeline combining OCR, NLP classification, and LLM-powered summarization with a full PostgreSQL audit trail and Docker-based deployment.',
        date: '2024-11-01',
        tags: ['Python', 'Docker', 'PostgreSQL', 'LangChain', 'Healthcare', 'RAG'],
        coverImage: null,
        projectStatus: 'active',
        techStack: ['Python', 'Docker', 'PostgreSQL', 'LangChain', 'FastAPI', 'Redis'],
        impactMetric: '30% reduction in document processing time',
        repoUrl: null,
        demoUrl: null,
        paperUrl: null,
        gallery: [],
        body: `## Problem

Clinical staff at a mid-size hospital were spending 3–4 hours per shift manually reviewing, summarizing, and routing incoming patient documents — referral letters, discharge summaries, lab reports. The process was slow, inconsistent across staff members, and introduced transcription errors when data was re-entered into the hospital information system.

## Approach

The MedAI pipeline ingests documents via a secure SFTP drop zone and processes them through four stages:

1. **OCR**: Tesseract with adaptive image preprocessing for scanned documents; direct extraction for digitally-born PDFs
2. **Classification**: A fine-tuned BERT classifier routes documents to the correct processing template (referral, lab, discharge, etc.)
3. **Extraction**: LangChain chains structured field extraction using a hospital-specific prompt library and GPT-4 as backbone
4. **Audit**: Every extracted field, source span, and model decision is written to PostgreSQL for compliance traceability

The entire stack runs in Docker Compose on an on-premise server, meeting KVKK data residency requirements.

\`\`\`python
class DocumentPipeline:
    def __init__(self, db: Session, llm: BaseLLM):
        self.ocr = AdaptiveOCR()
        self.classifier = DocumentClassifier.load("models/doc-classifier-v3")
        self.extractor = FieldExtractor(llm=llm)
        self.db = db

    async def process(self, document: bytes, filename: str) -> ProcessedDocument:
        text = await self.ocr.extract(document)
        doc_type = self.classifier.predict(text)
        fields = await self.extractor.run(text, template=doc_type)
        record = self.db.save(ProcessedDocument(fields=fields, source=filename))
        return record
\`\`\`

## Impact

After deployment, document processing time dropped by 30% on average. The audit trail caught three instances of extraction errors in the first month, enabling rapid correction before data entered the HIS. Physician review time on summarized referrals decreased by 40% due to improved consistency of extracted output.`
    }
];

// ─── Shared UI Constants (available to all pages that load data.js) ──────────

const TYPE_LABELS = { project: 'Project', research: 'Research', blog: 'Blog', talk: 'Talk' };
const TYPE_ICONS  = { project: '⚡', research: '🔬', blog: '✍️', talk: '🎤' };

// ─── Helper Functions ────────────────────────────────────────────────────────

// Memoized sorted list — CONTENT is static so the result never changes.
let _contentCache = null;

/**
 * Returns all published content items, sorted by date descending.
 * Result is memoized since CONTENT never changes at runtime.
 * @returns {Array}
 */
function getAllContent() {
    if (_contentCache) return _contentCache;
    _contentCache = CONTENT
        .filter(item => item.status !== 'draft')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    return _contentCache;
}

/**
 * Returns a single published item by slug, or null.
 * @param {string} slug
 * @returns {Object|null}
 */
function getContentBySlug(slug) {
    const item = CONTENT.find(item => item.slug === slug);
    if (!item || item.status === 'draft') return null;
    return item;
}

/**
 * Returns all published items of a given type, sorted by date descending.
 * @param {'project'|'research'|'blog'|'talk'} type
 * @returns {Array}
 */
function getContentByType(type) {
    return getAllContent().filter(item => item.type === type);
}

/**
 * Returns all published items containing the given tag (case-insensitive).
 * Tags must not contain commas.
 * @param {string} tag
 * @returns {Array}
 */
function getContentByTag(tag) {
    const lower = tag.toLowerCase();
    return getAllContent().filter(item =>
        (item.tags || []).some(t => t.toLowerCase() === lower)
    );
}

/**
 * Returns all published featured items, sorted by date descending.
 * @returns {Array}
 */
function getFeaturedContent() {
    return getAllContent().filter(item => item.featured === true);
}

/**
 * Returns all unique tags across all published content, sorted alphabetically.
 * @returns {string[]}
 */
function getAllTags() {
    const tagSet = new Set();
    getAllContent().forEach(item => (item.tags || []).forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
}

/**
 * Returns up to `limit` published items sharing the most tags with the given slug.
 * Excludes the item itself. Ranked by tag overlap count descending.
 * @param {string} slug
 * @param {number} [limit=3]
 * @returns {Array}
 */
function getRelatedContent(slug, limit = 3) {
    const item = getContentBySlug(slug);
    if (!item) return [];
    const itemTags = new Set((item.tags || []).map(t => t.toLowerCase()));

    return getAllContent()
        .filter(other => other.slug !== slug)
        .map(other => {
            const otherTags = (other.tags || []).map(t => t.toLowerCase());
            const overlap = otherTags.filter(t => itemTags.has(t)).length;
            return { item: other, overlap };
        })
        .filter(entry => entry.overlap > 0)
        .sort((a, b) => b.overlap - a.overlap)
        .slice(0, limit)
        .map(entry => entry.item);
}

/**
 * Returns { prev, next } for navigation relative to the given slug.
 * Preference: same type. Fallback: any type. Boundary returns null.
 * List is sorted by date descending (newer = lower index).
 * @param {string} slug
 * @returns {{ prev: Object|null, next: Object|null }}
 */
function getPrevNext(slug) {
    const item = getContentBySlug(slug);
    if (!item) return { prev: null, next: null };

    // Try same type first
    let list = getContentByType(item.type);
    let idx = list.findIndex(i => i.slug === slug);

    // Fallback to all content if isolated (only item of its type)
    if (list.length <= 1) {
        list = getAllContent();
        idx = list.findIndex(i => i.slug === slug);
    }

    return {
        prev: idx > 0 ? list[idx - 1] : null,
        next: idx < list.length - 1 ? list[idx + 1] : null
    };
}

/**
 * Returns all items in the same series (same seriesName), sorted by seriesOrder.
 * Returns empty array if item has no seriesName or is the only item in the series.
 * @param {string} slug
 * @returns {Array}
 */
function getSeriesItems(slug) {
    const item = getContentBySlug(slug);
    if (!item || !item.seriesName) return [];

    const seriesItems = getAllContent()
        .filter(i => i.seriesName === item.seriesName)
        .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));

    return seriesItems.length > 1 ? seriesItems : [];
}

/**
 * Estimates reading time in minutes. Word count / 200 wpm, minimum 1.
 * @param {string} body  Markdown string
 * @returns {number}
 */
function calculateReadingTime(body) {
    if (!body) return 1;
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

/**
 * Formats an ISO date string as "Month YYYY".
 * @param {string} isoDate  e.g. '2024-03-15'
 * @returns {string}        e.g. 'March 2024'
 */
function formatDate(isoDate) {
    if (!isoDate) return '';
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    const [year, month] = isoDate.split('-');
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

/**
 * Converts a YouTube watch URL to embed URL.
 * Handles youtube.com/watch?v=ID and youtu.be/ID formats.
 * @param {string} url
 * @returns {string|null}
 */
function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    try {
        const u = new URL(url);
        let id = null;
        if (u.hostname === 'youtu.be') {
            id = u.pathname.slice(1);
        } else if (u.hostname.includes('youtube.com')) {
            id = u.searchParams.get('v');
        }
        return id ? `https://www.youtube.com/embed/${id}` : null;
    } catch (e) {
        return null;
    }
}
