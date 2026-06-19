// "Lab" — from-scratch NLP/LLM implementations. Voice: plain, declarative, no em dashes.

export const labIntro = "Calling an API is easy. I wanted to know what happens underneath it.";

export const labBody = [
  "So I sat down and implemented the modern NLP and LLM stack from first principles. Not to reinvent it. To understand it well enough that nothing about a model feels like magic.",
  "Forty-five runnable notebooks, from a regex tokenizer to RLHF. I'm a PM now, but I don't want to manage what I can't reason about. Building these means I can argue about context windows, eval design, or why a model hallucinates from the implementation up, not from a blog post.",
];

export type Pack = {
  name: string;
  count: string;
  blurb: string;
  topics: string[];
};

export const packs: Pack[] = [
  {
    name: "NLP implementation",
    count: "13 notebooks",
    blurb: "The arc from classic NLP to transformers, one technique at a time. Build each thing, run it on small data, see why the next thing exists.",
    topics: [
      "Tokenization + regex + lexicon sentiment",
      "TF-IDF with Naive Bayes, logistic regression, SVM",
      "N-gram LMs, smoothing, perplexity",
      "Word2Vec / GloVe + semantic search",
      "Sequence tagging: HMM, Viterbi, CRF, BiLSTM",
      "Neural text classification in PyTorch",
      "Attention + a tiny Transformer, by hand",
      "BERT / GPT / T5 with Hugging Face",
      "Pretraining, fine-tuning, LoRA, SFT, DPO",
      "Summarization, QA, RAG, ROUGE + faithfulness",
      "Machine translation + decoding + BLEU",
      "Product evals: kappa, PII redaction, monitoring",
    ],
  },
  {
    name: "Advanced LLM systems",
    count: "32 notebooks",
    blurb: "The systems layer. How a modern LLM is actually built, served, and kept honest.",
    topics: [
      "Tokenizers, embeddings, RoPE / ALiBi, attention, MHA",
      "Transformer blocks, mini-former, sampling, speculative decoding",
      "KV cache, MQA / GQA / MLA, long context, FlashAttention",
      "Mixture of experts, sparse + state-space models, diffusion LMs",
      "Synthetic data, scaling laws, SFT / DPO / RLHF / GRPO",
      "Quantization + serving stacks",
      "Eval harnesses, RAG, tool use + agents",
      "Vision-language adapters, interpretability",
      "Red-teaming + a capstone that wires it together",
    ],
  },
];

export const labVerify =
  "Every code cell parses clean (45 notebooks, 232 cells, zero syntax errors). The classic notebooks run end to end on CPU with toy data. The heavy pieces (FlashAttention, vLLM serving, full RLHF) ship as teaching versions plus production templates.";

export const labRepo = "https://github.com/devwithjp/jp-nlp-lab";
