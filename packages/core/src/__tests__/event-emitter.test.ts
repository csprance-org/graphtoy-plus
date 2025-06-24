import { describe, it, expect, vi } from 'vitest';
import { EventEmitter } from '../event-emitter.js';

type TestEvents = {
  test: string;
  number: number;
  complex: { id: number; name: string };
};

describe('EventEmitter', () => {
  it('can emit and listen to events', () => {
    const emitter = new EventEmitter<TestEvents>();
    const mockListener = vi.fn();

    emitter.on('test', mockListener);
    emitter.emit('test', 'hello');

    expect(mockListener).toHaveBeenCalledWith('hello');
  });

  it('supports multiple listeners for the same event', () => {
    const emitter = new EventEmitter<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    emitter.on('test', listener1);
    emitter.on('test', listener2);
    emitter.emit('test', 'hello');

    expect(listener1).toHaveBeenCalledWith('hello');
    expect(listener2).toHaveBeenCalledWith('hello');
  });

  it('can remove specific listeners', () => {
    const emitter = new EventEmitter<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    emitter.on('test', listener1);
    emitter.on('test', listener2);
    emitter.off('test', listener1);
    emitter.emit('test', 'hello');

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledWith('hello');
  });

  it('can remove all listeners for an event', () => {
    const emitter = new EventEmitter<TestEvents>();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    emitter.on('test', listener1);
    emitter.on('test', listener2);
    emitter.removeAllListeners('test');
    emitter.emit('test', 'hello');

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
  });

  it('can remove all listeners', () => {
    const emitter = new EventEmitter<TestEvents>();
    const testListener = vi.fn();
    const numberListener = vi.fn();

    emitter.on('test', testListener);
    emitter.on('number', numberListener);
    emitter.removeAllListeners();
    emitter.emit('test', 'hello');
    emitter.emit('number', 42);

    expect(testListener).not.toHaveBeenCalled();
    expect(numberListener).not.toHaveBeenCalled();
  });

  it('handles different event types', () => {
    const emitter = new EventEmitter<TestEvents>();
    const testListener = vi.fn();
    const numberListener = vi.fn();
    const complexListener = vi.fn();

    emitter.on('test', testListener);
    emitter.on('number', numberListener);
    emitter.on('complex', complexListener);

    emitter.emit('test', 'hello');
    emitter.emit('number', 42);
    emitter.emit('complex', { id: 1, name: 'test' });

    expect(testListener).toHaveBeenCalledWith('hello');
    expect(numberListener).toHaveBeenCalledWith(42);
    expect(complexListener).toHaveBeenCalledWith({ id: 1, name: 'test' });
  });

  it('does not throw when removing non-existent listeners', () => {
    const emitter = new EventEmitter<TestEvents>();
    const listener = vi.fn();

    expect(() => {
      emitter.off('test', listener);
      emitter.removeAllListeners('test');
    }).not.toThrow();
  });

  it('does not throw when emitting events with no listeners', () => {
    const emitter = new EventEmitter<TestEvents>();

    expect(() => {
      emitter.emit('test', 'hello');
    }).not.toThrow();
  });
});