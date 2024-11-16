import torch
from torch import nn

class CustomViTForDetection(nn.Module):
    def __init__(self, num_classes, num_queries=100, image_size=512, patch_size=16):
        super(CustomViTForDetection, self).__init__()
        self.image_size = image_size
        self.patch_size = patch_size
        self.num_patches = (image_size // patch_size) ** 2  # Total number of patches
        self.embedding_dim = 768  # Feature dimension

        # Embeddings and Transformer Encoder (ViT backbone)
        self.cls_token = nn.Parameter(torch.zeros(1, 1, self.embedding_dim))  # Classification token
        self.position_embeddings = nn.Parameter(
            torch.zeros(1, self.num_patches + 1, self.embedding_dim)
        )  # Positional embeddings (+1 for cls_token)
        self.patch_embeddings = nn.Conv2d(
            3, self.embedding_dim, kernel_size=patch_size, stride=patch_size
        )  # Patch embeddings

        # Transformer Encoder
        self.encoder = nn.ModuleList([
            nn.TransformerEncoderLayer(d_model=self.embedding_dim, nhead=12, dim_feedforward=3072)
            for _ in range(12)
        ])
        self.layernorm = nn.LayerNorm(self.embedding_dim)

        # Detection heads
        self.bbox_head = nn.Linear(self.embedding_dim, 4)  # Bounding box predictions
        self.class_head = nn.Linear(self.embedding_dim, num_classes)  # Class predictions

        # Queries for object detection
        self.query_embeddings = nn.Parameter(torch.randn(num_queries, self.embedding_dim))

    def forward(self, x):
        # Convert image patches
        patches = self.patch_embeddings(x)  # Shape: [batch_size, 768, H/patch_size, W/patch_size]
        patches = patches.flatten(2).permute(0, 2, 1)  # Shape: [batch_size, num_patches, 768]

        # Add positional embeddings and cls_token
        batch_size = patches.size(0)
        cls_tokens = self.cls_token.expand(batch_size, -1, -1)  # Shape: [batch_size, 1, 768]
        x = torch.cat((cls_tokens, patches), dim=1)  # Shape: [batch_size, 1+num_patches, 768]
        x = x + self.position_embeddings

        # Pass through transformer encoder
        for layer in self.encoder:
            x = layer(x)

        x = self.layernorm(x)

        # Use queries for detection
        queries = self.query_embeddings.expand(batch_size, -1, -1)
        x = torch.cat((x, queries), dim=1)  # Shape: [batch_size, num_queries + patches, 768]

        # Apply detection heads
        bboxes = self.bbox_head(x)  # Shape: [batch_size, num_queries, 4]
        class_logits = self.class_head(x)  # Shape: [batch_size, num_queries, num_classes]
        return bboxes, class_logits
