import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  memberName: string;
  memberAvatar?: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentThreadProps {
  activityName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock comments for demo
const mockComments: Comment[] = [
  {
    id: '1',
    memberName: 'Sarah Chen',
    content: 'This looks amazing! But is it worth the price? Has anyone been here before?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    replies: [
      {
        id: '1-1',
        memberName: 'Mike Johnson',
        content: 'Totally worth it! Best view in Paris. I went last year and it was incredible.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: '2',
    memberName: 'Emma Wilson',
    content: 'Should we book this in advance? I heard it gets really crowded.',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
  },
];

export function CommentThread({ activityName, isOpen, onClose }: CommentThreadProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      memberName: 'You',
      content: newComment,
      timestamp: new Date().toISOString(),
    };

    if (replyingTo) {
      // Add as reply
      setComments(prev =>
        prev.map(c => {
          if (c.id === replyingTo) {
            return {
              ...c,
              replies: [...(c.replies || []), comment],
            };
          }
          return c;
        })
      );
      setReplyingTo(null);
    } else {
      // Add as new comment
      setComments(prev => [...prev, comment]);
    }

    setNewComment('');
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : ''}`}>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage src={comment.memberAvatar} alt={comment.memberName} />
        <AvatarFallback className="text-xs">{getInitials(comment.memberName)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{comment.memberName}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-foreground mb-2">{comment.content}</p>
        {!isReply && (
          <button
            onClick={() => setReplyingTo(comment.id)}
            className="text-xs text-primary hover:underline"
          >
            Reply
          </button>
        )}
        
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments: {activityName}
          </DialogTitle>
        </DialogHeader>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>

        {/* Add comment */}
        <div className="border-t pt-4">
          {replyingTo && (
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Replying to comment</span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-primary hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
              className="min-h-[80px] resize-none"
            />
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              size="icon"
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
