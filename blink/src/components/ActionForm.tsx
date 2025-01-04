'use client';
import React, { useState, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash } from 'lucide-react';
import { StaticPage } from './StaticPage';

interface FormData {
  title: string;
  description: string;
  imageUrl: string;  // Changed from iconUrl to match API
  label: string;     // Added to match API
  amounts: number[]; // Changed from links array to amounts array
  customAmount: boolean; // Single flag for custom amount
}

export const ActionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    imageUrl: '',
    label: '',
    amounts: [],
    customAmount: false
  });
  const [newAmount, setNewAmount] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create action');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const addAmount = () => {
    if (newAmount && !isNaN(Number(newAmount))) {
      setFormData(prev => ({
        ...prev,
        amounts: [...prev.amounts, Number(newAmount)]
      }));
      setNewAmount('');
    }
  };

  const removeAmount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amounts: prev.amounts.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex px-10 relative">
      <StaticPage />
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Solana Action</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Enter label"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">Fixed Amounts (SOL)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="Amount in SOL"
                      className="w-24"
                    />
                    <Button type="button" onClick={addAmount} size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {formData.amounts.map((amount, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span>{amount} SOL</span>
                      <Button 
                        type="button"
                        onClick={() => removeAmount(index)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.customAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, customAmount: e.target.checked }))}
                    className="mr-2"
                  />
                  <label className="text-sm">Allow custom amount</label>
                </div>
              </div>

              <Button type="submit" className="w-full">Create Action</Button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg flex-wrap">
                <h3 className="font-medium mb-2">Action Created Successfully!</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};